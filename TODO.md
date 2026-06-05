# TODO - Fix "myroadmap" not connected to "generate"

- [ ] Analyze current behavior: identify how `generate.jsx` stores roadmap data vs how `myroadmap.jsx` expects it.
- [x] Implement fix (planned as option A): make `generate.jsx` generate and save roadmap structure (weeks + days) in the exact format used by `myroadmap.jsx`.
- [x] Normalize `testType` values (e.g. `TOEFL ITP` -> `TOEFL`) consistently in both generate + myroadmap/quiz.
- [x] Run `npm run build` (and/or `npm run dev`) to validate compilation.
- [ ] Smoke test: generate roadmap -> myroadmap shows weeks/days -> start quiz works and completion marks days as completed.
