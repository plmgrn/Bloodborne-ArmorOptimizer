# The Attire Ledger

A small browser tool that finds the best Bloodborne armor combination (Hat + Garb + Gloves +
Trousers) for a chosen resistance stat — ported from an Excel/VBA optimizer
(`ModOptimizer.bas` + `bb_armor.xlsm`, kept in this repo for reference).

> **Fan-made project.** Not affiliated with, endorsed by, or sponsored by Sony Interactive
> Entertainment or FromSoftware. Bloodborne is a trademark of Sony Interactive Entertainment.
> The code here is original and licensed as below; the armor names and stats in `src/data.ts`
> originate from the game itself and remain the property of their respective owners.


It computes two results:

- **Scenario A** — the combination that maximizes your chosen primary resistance.
- **Scenario B** — the combination with the best weighted total among combos that stay within a
  tolerance % of Scenario A's primary resistance.

Everything runs client-side against a static, hardcoded item list — no backend, no database.
See `PORTING_NOTES.md` for exactly how each piece of the original VBA maps to this codebase.


## Background

I created an spreadsheet with all the attire in the game on my first full Bloodborne playthrough. I had thought that there might be a possiblity of optimizing your armor, but from this calculator it would seem like there is a single BiS combination of attire, that is mathematically correct.

The reason this project is alive and deployed is for a rare scenario of wanting the best attire for one resist type. (Which would not make sense as all the bosses in the game do pretty much the same damage, which is best countered by the BiS combination)

## Project structure

```
index.html
src/
  data.ts             # static item data + types, extracted from bb_armor.xlsm
  calculations.ts      # pure calculation engine (ported from ModOptimizer.bas)
  calculations.test.ts # unit + golden-regression tests
  main.ts               # DOM/UI glue
  styles.css
.github/workflows/deploy.yml  # builds + deploys to GitHub Pages on push to main
```

## Development

Requires Node 20+.

```bash
npm install
npm run dev       # local dev server
npm test          # run the test suite once
npm run test:watch
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build locally
```

## Deploying to GitHub Pages

This repo is set up for the **GitHub Actions** deployment method:

1. In the repo's Settings → Pages, set **Source** to "GitHub Actions".
2. Push to `main`. The workflow in `.github/workflows/deploy.yml` installs dependencies, runs the
   test suite, builds, and deploys `dist/` automatically.

`vite.config.ts` uses `base: './'` (relative asset paths), so it works on a project page
(`https://<user>.github.io/<repo>/`) without needing the repo name hardcoded anywhere.

## Regenerating the data

`src/data.ts` is a one-time extraction from `bb_armor.xlsm`'s Hats/Shirts/Gloves/Pants sheets. If
the source workbook changes, regenerate the file rather than hand-editing stat values — see the
extraction approach described in `PORTING_NOTES.md`.


## License

The code in this repository is licensed under the **GNU Affero General Public License v3.0
(AGPL-3.0-only)** — see `LICENSE`.

In short, compared to a permissive license like MIT: anyone can use, run, and modify this code,
including commercially, but if they distribute it — or run a modified version of it as a network
service that other people interact with — they must make that modified source available under
the same license. That "network use" clause (§13) is the main reason to pick AGPL over the
plain GPL: it closes the loophole where someone could host a modified version publicly without
ever redistributing the changes. It doesn't restrict what *you* can do with your own code,
including monetizing it — the copyleft only binds downstream users who convey or publicly run a
modified version.

One practical wrinkle for this particular project: AGPL governs the *code*, not the Bloodborne
item data or the "Bloodborne" name itself, which come from the underlying game and remain Sony/
FromSoftware's IP regardless of how the code around them is licensed (see the disclaimer above
and `PORTING_NOTES.md`). And since this is a game-adjacent fan tool rather than a commercial
product of its own, keeping monetization off the table for *this specific deployment* is the
more conservative choice — nothing stops you from reusing the AGPL-licensed code elsewhere in a
context where that concern doesn't apply.

The `LICENSE` file currently contains a placeholder — see the note at the top of that file for
how to drop in the full official license text before you publish.
