// Pure calculation engine — ported from ModOptimizer.bas (RunOptimization / FindMaxPrimary /
// FindMaxTotalConstrained / BuildCombo). No DOM access, no globals: every input is a parameter,
// every output is returned. See ../PORTING_NOTES.md for the VBA-to-TS mapping and known quirks
// that are intentionally preserved rather than "fixed".

import { STAT_ORDER, type ArmorItem, type ArmorSlot, type StatName } from './data';

export interface ComboTotals {
  items: ArmorItem[];
  totalPrimary: number;
  totalTiebreaker: number;
  totalRawSum: number;
  totalWeighted: number;
}

export interface OptimizeResult {
  scenarioA: ComboTotals;
  scenarioB: ComboTotals;
  threshold: number;
  scenarioBMetThreshold: boolean;
  comparison: {
    primaryDiff: number;
    primaryDiffPct: number;
    totalDiff: number;
    totalDiffPct: number;
    /** TOTAL (weighted) traded per 1 point of primary stat given up. Undefined when primaryDiff is 0. */
    tradeRatio: number | undefined;
  };
}

/**
 * Per-item weighted score: SUMPRODUCT(stats, weights) across all 11 stats.
 * Mirrors the `TOTAL` column formula on each item sheet.
 */
export function itemWeightedTotal(item: ArmorItem, weights: Record<StatName, number>): number {
  let sum = 0;
  for (const stat of STAT_ORDER) {
    sum += item.stats[stat] * weights[stat];
  }
  return sum;
}

/**
 * Per-item raw sum. Mirrors the `RAW SUM` column formula, which sums Physical..Frenzy —
 * this EXCLUDES Beasthood. That's how the source workbook defines it; preserved as-is
 * rather than "corrected", per the instruction not to silently change algorithm behavior.
 */
export function itemRawSum(item: ArmorItem): number {
  let sum = 0;
  for (const stat of STAT_ORDER) {
    if (stat === 'beasthood') continue;
    sum += item.stats[stat];
  }
  return sum;
}

/** Ports BuildCombo(i1, i2, i3, i4). */
export function buildCombo(
  items: ArmorItem[],
  primaryStat: StatName,
  tiebreakerStat: StatName,
  weights: Record<StatName, number>
): ComboTotals {
  let totalPrimary = 0;
  let totalTiebreaker = 0;
  let totalRawSum = 0;
  let totalWeighted = 0;
  for (const item of items) {
    totalPrimary += item.stats[primaryStat];
    totalTiebreaker += item.stats[tiebreakerStat];
    totalRawSum += itemRawSum(item);
    totalWeighted += itemWeightedTotal(item, weights);
  }
  return { items, totalPrimary, totalTiebreaker, totalRawSum, totalWeighted };
}

/**
 * Ports FindMaxPrimary. Composite score encodes a lexicographic sort — primary stat first,
 * tiebreaker second, weighted total third — as a single comparable number, same as the VBA's
 * `primary * 1e9 + tiebreaker * 1e6 + weighted`.
 */
export function findMaxPrimary(
  slots: [ArmorItem[], ArmorItem[], ArmorItem[], ArmorItem[]],
  primaryStat: StatName,
  tiebreakerStat: StatName,
  weights: Record<StatName, number>
): ComboTotals {
  const [a, b, c, d] = slots;
  let best: ComboTotals | null = null;
  let bestScore = -1;

  for (const i1 of a) {
    for (const i2 of b) {
      for (const i3 of c) {
        for (const i4 of d) {
          const combo = buildCombo([i1, i2, i3, i4], primaryStat, tiebreakerStat, weights);
          const score = combo.totalPrimary * 1_000_000_000 + combo.totalTiebreaker * 1_000_000 + combo.totalWeighted;
          if (score > bestScore) {
            bestScore = score;
            best = combo;
          }
        }
      }
    }
  }

  if (!best) {
    throw new Error('findMaxPrimary: no combination found — one or more slots has no items');
  }
  return best;
}

/**
 * Ports FindMaxTotalConstrained. Among combos whose primary total meets `threshold`, picks the
 * highest weighted total (tiebreaker stat breaks ties). If nothing meets the threshold, falls
 * back to the Scenario A combo — this fallback is preserved exactly as in the VBA.
 */
export function findMaxTotalConstrained(
  slots: [ArmorItem[], ArmorItem[], ArmorItem[], ArmorItem[]],
  primaryStat: StatName,
  tiebreakerStat: StatName,
  weights: Record<StatName, number>,
  threshold: number,
  fallback: ComboTotals
): { combo: ComboTotals; metThreshold: boolean } {
  const [a, b, c, d] = slots;
  let best: ComboTotals | null = null;
  let bestScore = -1;
  let foundAny = false;

  for (const i1 of a) {
    for (const i2 of b) {
      for (const i3 of c) {
        for (const i4 of d) {
          const combo = buildCombo([i1, i2, i3, i4], primaryStat, tiebreakerStat, weights);
          if (combo.totalPrimary >= threshold) {
            const score = combo.totalWeighted * 1_000_000 + combo.totalTiebreaker;
            if (score > bestScore) {
              bestScore = score;
              best = combo;
              foundAny = true;
            }
          }
        }
      }
    }
  }

  if (!foundAny) {
    return { combo: fallback, metThreshold: false };
  }
  return { combo: best as ComboTotals, metThreshold: true };
}

/**
 * Ports the full RunOptimization flow (minus the Excel I/O): given the 4 slot item pools and
 * the user's chosen primary/tiebreaker stats, tolerance, and weight vector, returns both
 * scenarios plus the comparison block that OutputResults used to print.
 */
export function optimize(
  slotsBySlot: Record<ArmorSlot, ArmorItem[]>,
  slotOrder: [ArmorSlot, ArmorSlot, ArmorSlot, ArmorSlot],
  primaryStat: StatName,
  tiebreakerStat: StatName,
  tolerancePct: number,
  weights: Record<StatName, number>
): OptimizeResult {
  const slots: [ArmorItem[], ArmorItem[], ArmorItem[], ArmorItem[]] = [
    slotsBySlot[slotOrder[0]],
    slotsBySlot[slotOrder[1]],
    slotsBySlot[slotOrder[2]],
    slotsBySlot[slotOrder[3]],
  ];

  const scenarioA = findMaxPrimary(slots, primaryStat, tiebreakerStat, weights);
  const threshold = scenarioA.totalPrimary * (1 - tolerancePct / 100);
  const { combo: scenarioB, metThreshold } = findMaxTotalConstrained(
    slots,
    primaryStat,
    tiebreakerStat,
    weights,
    threshold,
    scenarioA
  );

  const primaryDiff = scenarioB.totalPrimary - scenarioA.totalPrimary;
  const totalDiff = scenarioB.totalWeighted - scenarioA.totalWeighted;

  return {
    scenarioA,
    scenarioB,
    threshold,
    scenarioBMetThreshold: metThreshold,
    comparison: {
      primaryDiff,
      primaryDiffPct: scenarioA.totalPrimary !== 0 ? primaryDiff / scenarioA.totalPrimary : 0,
      totalDiff,
      totalDiffPct: scenarioA.totalWeighted !== 0 ? totalDiff / scenarioA.totalWeighted : 0,
      tradeRatio: primaryDiff !== 0 ? Math.abs(totalDiff / primaryDiff) : undefined,
    },
  };
}
