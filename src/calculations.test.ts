import { describe, it, expect } from 'vitest';
import { armorData, DEFAULT_WEIGHTS, type StatName } from './data';
import { optimize, itemRawSum, itemWeightedTotal, findMaxPrimary, findMaxTotalConstrained } from './calculations';

const SLOT_ORDER: ['hats', 'shirts', 'gloves', 'pants'] = ['hats', 'shirts', 'gloves', 'pants'];

describe('golden regression — matches the workbook Results sheet exactly', () => {
  // Config sheet: Primary=Fire, Tiebreaker=Physical, Tolerance=15%, default Utility weights.
  // Expected values transcribed directly from the Results sheet produced by RunOptimization
  // in the original workbook. If this test ever fails, the port has drifted from the VBA.
  it('reproduces Scenario A and Scenario B for Primary=Fire, Tiebreaker=Physical, Tolerance=15%', () => {
    const result = optimize(armorData, SLOT_ORDER, 'fire', 'physical', 15, DEFAULT_WEIGHTS);

    expect(result.scenarioA.items.map((i) => i.name)).toEqual([
      'Bone Ash Mask',
      'Bone Ash Armor',
      'Old Hunter Arm Bands',
      'Wine Hakama',
    ]);
    expect(result.scenarioA.totalPrimary).toBe(380);
    expect(result.scenarioA.totalTiebreaker).toBe(250);
    expect(result.scenarioA.totalRawSum).toBe(1934);
    expect(result.scenarioA.totalWeighted).toBeCloseTo(1055.3, 5);

    expect(result.threshold).toBeCloseTo(323, 5);

    expect(result.scenarioB.items.map((i) => i.name)).toEqual([
      'Harrowed Hood',
      "Gascoigne's Garb",
      'Old Hunter Arm Bands',
      'Charred Hunter Boots',
    ]);
    expect(result.scenarioB.totalPrimary).toBe(330);
    expect(result.scenarioB.totalTiebreaker).toBe(250);
    expect(result.scenarioB.totalRawSum).toBe(2079);
    expect(result.scenarioB.totalWeighted).toBeCloseTo(1144.4, 5);
    expect(result.scenarioBMetThreshold).toBe(true);

    expect(result.comparison.primaryDiff).toBe(-50);
    expect(result.comparison.primaryDiffPct).toBeCloseTo(-50 / 380, 5);
    expect(result.comparison.totalDiff).toBeCloseTo(89.1, 5);
    expect(result.comparison.tradeRatio).toBeCloseTo(1.782, 2); // "1.8 TOTAL per 1 Fire" in the sheet
  });
});

describe('itemWeightedTotal / itemRawSum', () => {
  const sample = armorData.hats.find((i) => i.name === 'Beak Mask')!;

  it('weighted total sums all 11 stats against the weight vector', () => {
    // Beak Mask: physical 50, blunt 40, thrust 40, blood 60, arcane 30, fire 40, bolt 30,
    // slowPoison 8, rapidPoison 10, frenzy 40, beasthood 2 — weights per DEFAULT_WEIGHTS.
    const expected =
      50 * 1 + 40 * 0.8 + 40 * 0.71 + 60 * 0.4 + 30 * 0.6 + 40 * 0.6 + 30 * 0.3 + 8 * 0 + 10 * 0 + 40 * 0 + 2 * 0;
    expect(itemWeightedTotal(sample, DEFAULT_WEIGHTS)).toBeCloseTo(expected, 5);
  });

  it('raw sum excludes Beasthood, matching the workbook RAW SUM formula', () => {
    const withBeasthood =
      sample.stats.physical +
      sample.stats.blunt +
      sample.stats.thrust +
      sample.stats.blood +
      sample.stats.arcane +
      sample.stats.fire +
      sample.stats.bolt +
      sample.stats.slowPoison +
      sample.stats.rapidPoison +
      sample.stats.frenzy +
      sample.stats.beasthood;
    expect(itemRawSum(sample)).toBe(withBeasthood - sample.stats.beasthood);
  });
});

describe('edge cases', () => {
  it('tolerance of 0% still finds a Scenario B (threshold equals Scenario A exactly)', () => {
    const result = optimize(armorData, SLOT_ORDER, 'physical', 'fire', 0, DEFAULT_WEIGHTS);
    expect(result.threshold).toBe(result.scenarioA.totalPrimary);
    // Scenario A itself always satisfies totalPrimary >= threshold when tolerance is 0,
    // so Scenario B must meet the threshold (possibly by falling back to the same combo).
    expect(result.scenarioB.totalPrimary).toBeGreaterThanOrEqual(result.threshold);
  });

  it('falls back to Scenario A when no combo can meet an unreachably high threshold', () => {
    // A primary stat with weight 0 in a lopsided combination can still fail an extreme
    // tolerance; force the fallback path by using a stat/tolerance pair that cannot be beaten.
    // Beasthood has a wide spread — use 100% tolerance inverted via a stat that stays constant
    // isn't reliable, so instead assert on the documented contract directly: with tolerance
    // slightly negative (an unreachable, stricter-than-max threshold), the fallback fires.
    const result = optimize(armorData, SLOT_ORDER, 'arcane', 'physical', -50, DEFAULT_WEIGHTS);
    expect(result.scenarioBMetThreshold).toBe(false);
    expect(result.scenarioB).toEqual(result.scenarioA);
  });

  it('a weight vector with zero weight on the primary stat still ranks primary stat first', () => {
    const weights: Record<StatName, number> = { ...DEFAULT_WEIGHTS, bolt: 0 };
    const result = optimize(armorData, SLOT_ORDER, 'bolt', 'physical', 15, weights);
    // Scenario A must still maximize totalPrimary (bolt) even though bolt's own weight is 0 —
    // the composite score's primary term (1e9) dominates the weighted-total term regardless.
    const [a, b, c, d] = SLOT_ORDER.map((s) => armorData[s]);
    const bruteBest = findMaxPrimary([a, b, c, d], 'bolt', 'physical', weights);
    expect(result.scenarioA.totalPrimary).toBe(bruteBest.totalPrimary);
  });

  it('findMaxTotalConstrained returns metThreshold=false and the given fallback when nothing qualifies', () => {
    const [a, b, c, d] = SLOT_ORDER.map((s) => armorData[s]);
    const fallback = findMaxPrimary([a, b, c, d], 'blood', 'physical', DEFAULT_WEIGHTS);
    const { combo, metThreshold } = findMaxTotalConstrained(
      [a, b, c, d],
      'blood',
      'physical',
      DEFAULT_WEIGHTS,
      Number.POSITIVE_INFINITY,
      fallback
    );
    expect(metThreshold).toBe(false);
    expect(combo).toBe(fallback);
  });
});
