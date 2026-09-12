# Porting notes: ModOptimizer.bas → TypeScript

Source of truth: `ModOptimizer.bas` plus the `bb_armor.xlsm` workbook (Hats/Shirts/Gloves/Pants
item tables, the `Utility` sheet's weight vector, and the `Config`/`Results` sheets).

## What was converted

| VBA | TypeScript | Notes |
|---|---|---|
| `RunOptimization` | `optimize()` in `calculations.ts` | Excel I/O (reading `Config`, writing `Results`) stripped out; takes explicit parameters instead |
| `LoadConfig` / `StatNameToCol` | n/a | No longer needed — stats are addressed by name (`StatName` keys) instead of column index |
| `LoadItems` | `armorData` in `data.ts` | Extracted once from the workbook into a static array; see "Data" below |
| `BuildCombo` | `buildCombo()` | Same field-by-field sum |
| `FindMaxPrimary` | `findMaxPrimary()` | Same composite score: `primary * 1e9 + tiebreaker * 1e6 + weighted` |
| `FindMaxTotalConstrained` | `findMaxTotalConstrained()` | Same score (`weighted * 1e6 + tiebreaker`) and same fallback-to-Scenario-A behavior when nothing meets the threshold |
| `OutputResults` | `main.ts` rendering | Replaced with DOM rendering instead of writing to a `Results` sheet |
| Item sheet `TOTAL` column (`=SUMPRODUCT(...)`) | `itemWeightedTotal()` | Sums all 11 stats against the weight vector |
| Item sheet `RAW SUM` column (`=SUM(Physical:Frenzy)`) | `itemRawSum()` | **Preserved as-is: excludes Beasthood.** This looked like it might be a spreadsheet oversight (RAW SUM covers 10 of the 11 stat columns), but per the instruction not to silently "fix" the source algorithm, the exclusion is kept exactly. Flagging here in case it should actually be corrected upstream. |

## Not ported (display/derived only, not read by `RunOptimization`)

- `PODIUM`, `HELPER`, `PRI_STAT`, `TIE_STAT`, `COMP_A`, `RANK_A` columns on each item sheet —
  these are per-item local rankings used only for spreadsheet browsing. The VBA optimizer does a
  full brute-force search over every item and never reads these columns.
- `TLDR` and `Best` sheets — computed display views.
- `Full sets` sheet — reference data for pre-bundled armor sets; not part of the 4-slot
  combinatorial search.

## Data

`src/data.ts` was generated once from the workbook (125 items total: 34 Hats, 34 Shirts, 26
Gloves, 31 Pants) and is checked in as a static array, per the project plan (data is small and
static — no need for a build-time spreadsheet read). If the source workbook changes, regenerate
this file rather than hand-editing stat values.

## VBA constructs that needed care

- **1-based loops** (`For i = 2 To lastRow`) → 0-based array iteration in TS. No off-by-one
  issues expected since TS iterates the extracted arrays directly rather than re-deriving bounds.
- **All values are `Double`** in the VBA — no integer-division (`\`) or type-coercion behavior to
  reproduce; JS's IEEE-754 numbers match VBA `Double` arithmetic directly.
- **`Format(x, "0.0%")` / `Format(x, "0.0")`** → `toFixed(1)` in `main.ts`. Same rounding
  (round-half-away-from-zero vs. JS's round-half-to-even) could theoretically differ at the last
  decimal digit in rare cases; not expected to matter for display purposes here, but noted.
- **Fallback branch** in `FindMaxTotalConstrained`: preserved exactly — `optimize()` reports this
  via `scenarioBMetThreshold: false` so the UI can say so, rather than silently showing a
  duplicate scenario with no explanation.

## Verification against the source workbook

Before writing the TypeScript, the algorithm was prototyped in plain JS against the extracted
item data and checked against the workbook's own `Results` sheet (Primary=Fire,
Tiebreaker=Physical, Tolerance=15%, default weights) — item picks and all totals matched exactly.
That case is now a permanent regression test in `src/calculations.test.ts`.
