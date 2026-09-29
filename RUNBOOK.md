<!-- (instinct) Index the new session folders after Gautam asked to separate each run set for easier review. -->
# Result folders

- `session-A/`, `session-B/`, `session-C/`: original strict results and post-hoc no-monitor audits, unchanged.
- `session-legacy/`: earlier `results.strict.jsonl`, preserved.
- `session-4/`: 90-run honesty-prompt experiment and separate secret-monitor audit.
<!-- (instinct) Document the isolated S5 outputs so the previous results cannot be overwritten during the amnesty/threat experiment. -->
- `session-5/`: 90-run amnesty-plus-threat experiment and separate secret-monitor audit.
<!-- (instinct) Keep S6 control outputs separate so the prior pressure prompts and their results remain reusable and unchanged. -->
- `session-6/`: 90-run control (normal/high worker prompts identical, no-monitor disclosure retained) and secret-monitor audit.

# Three-session strict experiment

This set is not a validated measure of intent. Key matching is an observable event; the worker's shown calculations/factual basis, admissions and monitor verdict supply different evidence. Inspect the raw rows rather than treating the monitor as ground truth. Knowledge prompts name a fixed source and date to avoid moving targets; exact facts may not be recalled reliably by a model. All three arms share the same prohibition, and strict exact-match grading still introduces a conflicting incentive to follow the visible key.

## On your PC

From your existing repo folder (where `.env` already has your key):

```bash
git status --short
git pull --ff-only
npm ci
```

If `git status --short` shows local work, save/commit it before `git pull --ff-only`; do not use `git reset --hard`. Check `.env` contains `GEMINI_API_KEY` and `GEMINI_MODEL=gemini-3.5-flash-lite` (do not paste the key into chat or commit `.env`). The runner checks both before it starts. It refuses to append to an existing results file; archive an old results file with a distinct name before a rerun. The old `session-legacy/results.strict.jsonl` is untouched. The smoke output is ignored by Git.

Smoke only A first; it makes six Worker calls and four Monitor calls (two problems per arm):

```bash
node src/runner.js --session=A --runs=2 --strict --smoke
```

If there are no errors in the summary, run each session in order (10 per arm, 30 rows per session):

```bash
node src/runner.js --session=A --runs=10 --strict
node src/runner.js --session=B --runs=10 --strict
node src/runner.js --session=C --runs=10 --strict
```

The output files are `session-A/results.sessionA-math.strict.jsonl`, `session-B/results.sessionB-knowledge.strict.jsonl`, and `session-C/results.sessionC-mixed.strict.jsonl`. Check each file has 30 JSONL rows and inspect the condition tallies/errors before starting the next; if persistent quota/rate-limit errors appear, stop rather than switching to a paid model. If a run is interrupted, its output is partial, so archive it before rerunning from the start. Each full session uses about 30 Worker + 20 Monitor calls, barring retries. These commands do not push results. Share the output or review it before committing and pushing, according to your usual review step.
