<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Prompt Control

Prompt control (historical S6): removes honesty/amnesty/threat and survival-score pressure. Normal/high worker text is identical.

This is an earlier experiment, separate from the later field-format tests. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [control-all-summary.json](results/control-all-summary.json) | Counts from saved raw truth/key flags |
| [control-all-questions.json](results/control-all-questions.json) | Runner / questions / audit evidence |
| [control-all-raw.jsonl](results/control-all-raw.jsonl) | Canonical original rows |
| [control-all-report.jsonl](results/control-all-report.jsonl) | Runner / questions / audit evidence |
| [control-all-script.js](scripts/control-all-script.js) | Runner / questions / audit evidence |
| [control-high-raw.jsonl](results/control-high-raw.jsonl) | Exact-line arm browsing subset |
| [control-no-monitor-raw.jsonl](results/control-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [control-normal-raw.jsonl](results/control-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 90. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../FINDINGS.md) | [Runbook](../../RUNBOOK.md)

## Folder layout

- [scripts/](scripts/): executable code for this session.
- [results/](results/): saved questions, raw evidence, summaries and reports.

## Saved results

| Arm | Runs | Correct | Wrong-key matches |
| --- | ---: | ---: | ---: |
| normal | 30 | 18 | 11 |
| high | 30 | 17 | 10 |
| no-monitor | 30 | 16 | 13 |

These counts describe saved answers, not proof of intent. Monitor judgments are separate.
