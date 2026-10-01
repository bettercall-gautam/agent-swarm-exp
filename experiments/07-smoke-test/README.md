# Format smoke tests

Detailed results and caveats: [FINDINGS.md](FINDINGS.md).

Two small selected tests compared split JSON with prose (10 per format), then split with combined JSON (5 per format). These have two formats, not three arms.

## Read the files

Names are `session-arm-type.ext`. `all` means the whole test, not one arm. `reason` = reasoning first; `ans` = answer first; `combined` = reasoning and answer in one string. Smoke uses its real `json` and `prose` formats.

| File | What it contains |
| --- | --- |
| [followup-all-questions.json](results/followup-all-questions.json) | Question/answer data; expected answers are not all shown to the model |
| [followup-all-raw.jsonl](results/followup-all-raw.jsonl) | Saved raw evidence, unchanged |
| [followup-all-script.js](scripts/followup-all-script.js) | Runner code; do not rerun completed experiments without a new plan |
| [followup-all-summary.json](results/followup-all-summary.json) | Reviewed results / parser resolutions |
| [followup-combined-raw.jsonl](results/followup-combined-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [followup-split-raw.jsonl](results/followup-split-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [smoke-all-questions.json](results/smoke-all-questions.json) | Question/answer data; expected answers are not all shown to the model |
| [smoke-all-raw.jsonl](results/smoke-all-raw.jsonl) | Saved raw evidence, unchanged |
| [smoke-all-report.md](results/smoke-all-report.md) | Review evidence / report and caveats |
| [smoke-all-script.js](scripts/smoke-all-script.js) | Runner code; do not rerun completed experiments without a new plan |
| [smoke-all-summary.json](results/smoke-all-summary.json) | Reviewed results / parser resolutions |
| [smoke-json-raw.jsonl](results/smoke-json-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |
| [smoke-prose-raw.jsonl](results/smoke-prose-raw.jsonl) | Exact-line arm subset; derived from all-raw, not an extra run |

## Important

Canonical `all-raw` files preserve the original run order and resume evidence. Arm subsets are browsing copies, so do not add their row counts to the canonical total. Raw null parser fields are preserved; use reviewed summaries for final counts.

No result here proves conscious intent. One sample per question/format and wording changes limit causal claims. Read [FINDINGS](../../FINDINGS.md) and [RUNBOOK](../../RUNBOOK.md) before interpreting or executing code.

## Folder layout

- [scripts/](scripts/): executable code for this session.
- [results/](results/): saved questions, raw evidence, summaries and reports.
