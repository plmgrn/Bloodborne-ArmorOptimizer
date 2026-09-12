import {
  armorData,
  STAT_ORDER,
  STAT_LABELS,
  SLOT_LABELS,
  DEFAULT_WEIGHTS,
  DEFAULT_PRIMARY_STAT,
  DEFAULT_TIEBREAKER_STAT,
  DEFAULT_TOLERANCE_PCT,
  type StatName,
  type ArmorSlot,
} from './data';
import { optimize, type ComboTotals, type OptimizeResult } from './calculations';

const SLOT_ORDER: [ArmorSlot, ArmorSlot, ArmorSlot, ArmorSlot] = ['hats', 'shirts', 'gloves', 'pants'];

const app = document.getElementById('app');
if (!app) throw new Error('#app root not found');

app.innerHTML = `
  <header class="masthead">
    <h1>The Attire Ledger</h1>
    <p>
      Choose the resistance you care most about and the ledger searches every Hat, Garb, Glove and
      Trouser combination to find the strongest set for it — then a second set that trades a little
      of that resistance for a better total, within the tolerance you allow.
    </p>
  </header>
  <div class="layout">
    <aside class="controls">
      <h2>Set the terms</h2>
      <div class="field">
        <label for="primary-stat">Primary resistance</label>
        <select id="primary-stat"></select>
      </div>
      <div class="field">
        <label for="tiebreaker-stat">Tiebreaker</label>
        <select id="tiebreaker-stat"></select>
      </div>
      <div class="field">
        <label for="tolerance">Tolerance for the second set (%)</label>
        <input type="number" id="tolerance" step="1" />
      </div>
      <button type="button" class="weights-toggle" id="weights-toggle" aria-expanded="false">
        Adjust stat weights
      </button>
      <div class="weights-grid hidden" id="weights-grid"></div>
      <button type="button" class="run-button" id="run-button">Find the best attire</button>
    </aside>
    <main>
      <div id="results">
        <div class="results-empty">The ledger is blank. Set your terms and find the best attire.</div>
      </div>
    </main>
  </div>
  <footer class="note">
    Weighted TOTAL sums all eleven resistances against the weights on the left. RAW SUM sums every
    resistance except Beasthood, matching how the source ledger defines it.
  </footer>
`;

const primarySelect = document.getElementById('primary-stat') as HTMLSelectElement;
const tiebreakerSelect = document.getElementById('tiebreaker-stat') as HTMLSelectElement;
const toleranceInput = document.getElementById('tolerance') as HTMLInputElement;
const weightsToggle = document.getElementById('weights-toggle') as HTMLButtonElement;
const weightsGrid = document.getElementById('weights-grid') as HTMLDivElement;
const runButton = document.getElementById('run-button') as HTMLButtonElement;
const resultsEl = document.getElementById('results') as HTMLDivElement;

for (const stat of STAT_ORDER) {
  const option = new Option(STAT_LABELS[stat], stat, stat === DEFAULT_PRIMARY_STAT, stat === DEFAULT_PRIMARY_STAT);
  primarySelect.add(option);
}
for (const stat of STAT_ORDER) {
  const option = new Option(
    STAT_LABELS[stat],
    stat,
    stat === DEFAULT_TIEBREAKER_STAT,
    stat === DEFAULT_TIEBREAKER_STAT
  );
  tiebreakerSelect.add(option);
}
toleranceInput.value = String(DEFAULT_TOLERANCE_PCT);

const weightInputs = new Map<StatName, HTMLInputElement>();
for (const stat of STAT_ORDER) {
  const row = document.createElement('div');
  row.className = 'weight-row';

  const label = document.createElement('label');
  label.textContent = STAT_LABELS[stat];
  label.htmlFor = `weight-${stat}`;

  const input = document.createElement('input');
  input.type = 'number';
  input.id = `weight-${stat}`;
  input.step = '0.05';
  input.value = String(DEFAULT_WEIGHTS[stat]);

  row.appendChild(label);
  row.appendChild(input);
  weightsGrid.appendChild(row);
  weightInputs.set(stat, input);
}

weightsToggle.addEventListener('click', () => {
  const isHidden = weightsGrid.classList.toggle('hidden');
  weightsToggle.setAttribute('aria-expanded', String(!isHidden));
});

function readWeights(): Record<StatName, number> {
  const weights = {} as Record<StatName, number>;
  for (const stat of STAT_ORDER) {
    const raw = Number(weightInputs.get(stat)!.value);
    weights[stat] = Number.isFinite(raw) ? raw : 0;
  }
  return weights;
}

function formatNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function formatPct(n: number): string {
  const pct = n * 100;
  const sign = pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

function renderCombo(combo: ComboTotals, primaryStat: StatName): string {
  const rows = SLOT_ORDER.map((slot, i) => {
    const item = combo.items[i];
    return `
      <li class="item-row">
        <span class="slot-name">${SLOT_LABELS[slot]}</span>
        <span class="item-name">${item.name}</span>
        <span class="item-primary">${formatNumber(item.stats[primaryStat])}</span>
      </li>
    `;
  }).join('');

  return `
    <ul class="item-list">${rows}</ul>
    <div class="totals-row">
      <span></span>
      <span>Total</span>
      <span class="item-primary">${formatNumber(combo.totalPrimary)}</span>
    </div>
    <div class="totals-detail">
      <span>Tiebreaker: <strong>${formatNumber(combo.totalTiebreaker)}</strong></span>
      <span>Weighted total: <strong>${formatNumber(combo.totalWeighted)}</strong></span>
      <span>Raw sum: <strong>${formatNumber(combo.totalRawSum)}</strong></span>
    </div>
  `;
}

function render(result: OptimizeResult, primaryStat: StatName, primaryLabel: string, tiebreakerLabel: string) {
  const { scenarioA, scenarioB, comparison, threshold, scenarioBMetThreshold } = result;

  resultsEl.innerHTML = `
    <div class="scenarios">
      <section class="scenario-card scenario-a">
        <div class="scenario-header">
          <p class="eyebrow">Scenario A</p>
          <h3>Maximum ${primaryLabel}</h3>
        </div>
        ${renderCombo(scenarioA, primaryStat)}
      </section>
      <section class="scenario-card scenario-b">
        <div class="scenario-header">
          <p class="eyebrow">Scenario B</p>
          <h3>Maximum total, ${primaryLabel} ≥ ${formatNumber(threshold)}</h3>
          ${
            scenarioBMetThreshold
              ? ''
              : `<p class="fallback-note">No combination reached that threshold, so this repeats Scenario A.</p>`
          }
        </div>
        ${renderCombo(scenarioB, primaryStat)}
      </section>
    </div>
    <div class="comparison">
      <h3>What the trade costs</h3>
      <div class="comparison-stat">
        <div class="label">${primaryLabel} difference</div>
        <div class="value ${comparison.primaryDiff >= 0 ? 'positive' : 'negative'}">
          ${formatNumber(comparison.primaryDiff)} (${formatPct(comparison.primaryDiffPct)})
        </div>
      </div>
      <div class="comparison-stat">
        <div class="label">Weighted total difference</div>
        <div class="value ${comparison.totalDiff >= 0 ? 'positive' : 'negative'}">
          ${formatNumber(comparison.totalDiff)} (${formatPct(comparison.totalDiffPct)})
        </div>
      </div>
      ${
        comparison.tradeRatio !== undefined
          ? `<div class="comparison-stat">
               <div class="label">Trade ratio</div>
               <div class="value">${comparison.tradeRatio.toFixed(1)} total per 1 ${tiebreakerLabel === primaryLabel ? '' : ''}${primaryLabel}</div>
             </div>`
          : ''
      }
    </div>
  `;
}

function runOptimization() {
  const primaryStat = primarySelect.value as StatName;
  const tiebreakerStat = tiebreakerSelect.value as StatName;
  const tolerancePct = Number(toleranceInput.value) || 0;
  const weights = readWeights();

  const result = optimize(armorData, SLOT_ORDER, primaryStat, tiebreakerStat, tolerancePct, weights);
  render(result, primaryStat, STAT_LABELS[primaryStat], STAT_LABELS[tiebreakerStat]);
}

runButton.addEventListener('click', runOptimization);
