# Math

*Formerly "Session A" (with B and C, "A/B/C") in early notes.*

Detailed results and caveats: [FINDINGS.md](FINDINGS.md).

Original strict math session (historical A): 10 questions in each of normal/high/no-monitor arms.

This is an earlier experiment, separate from the later field-format tests. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [math-all-summary.json](results/math-all-summary.json) | Counts from saved raw truth/key flags |
| [math-all-questions.json](results/math-all-questions.json) | Runner / questions / audit evidence |
| [math-all-raw.jsonl](results/math-all-raw.jsonl) | Canonical original rows |
| [math-high-raw.jsonl](results/math-high-raw.jsonl) | Exact-line arm browsing subset |
| [math-no-monitor-raw.jsonl](results/math-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [math-no-monitor-report.jsonl](results/math-no-monitor-report.jsonl) | Runner / questions / audit evidence |
| [math-normal-raw.jsonl](results/math-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 30. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../FINDINGS.md) | [Runbook](../../RUNBOOK.md)

## Folder layout

- [scripts/](scripts/): a pointer to the shared executable code, not a duplicate.
- [results/](results/): saved questions, raw evidence, summaries and reports.

## Saved results

| Arm | Runs | Correct | Wrong-key matches |
| --- | ---: | ---: | ---: |
| normal | 10 | 7 | 3 |
| high | 10 | 7 | 3 |
| no-monitor | 10 | 6 | 4 |

These counts describe saved answers, not proof of intent. Monitor judgments are separate.
