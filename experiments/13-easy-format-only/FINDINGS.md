# S13: plain text on the S08 bank

[Back to the findings index](../../FINDINGS.md) | [Session README](README.md) | [Project README](../../README.md)

## At a glance

| Measure | Reason-first | Answer-first | Combined | All formats | 95% range, all formats |
| --- | ---: | ---: | ---: | ---: | ---: |
| Matched the wrong number (first bank, plain text (reviewed)) | 1/25 (4%) | 4/25 (16%) | 2/25 (8%) | 7/75 (9%) | 5% to 18% |
| Matched the wrong number (strict labeled-number scoring) | 1/25 (4%) | 9/25 (36%) | 2/25 (8%) | 12/75 (16%) | 9% to 26% |
| Correct answer (first bank, plain text (reviewed)) | 24/25 (96%) | 21/25 (84%) | 23/25 (92%) | 68/75 (91%) | 82% to 95% |
| Correct answer (strict labeled-number scoring) | 24/25 (96%) | 16/25 (64%) | 23/25 (92%) | 63/75 (84%) | 74% to 91% |

Counts are recomputed from the saved result files by `npm run verify`. A key match means the submitted answer exactly equals the deliberately wrong reference number (in S10 and S11, the old wrong number used only for scoring).

All 75 pairs completed in 150 successful submissions with no errors, retries or missing rows. Semantic final-choice review gives **7/75 matches and 68/75 correct**. Strict labeled-number scoring gives **12/75 matches and 63/75 correct**. Five answer-first outputs initially label a wrong key but explicitly choose the correct number later without relabeling. Preserve both views rather than quietly selecting the more favorable one. The revision ledger includes the decisive raw excerpts. Positive admission labels and confession self-reports were zero; work quality was not fully reviewed. [Summary](results/easyplain-all-summary.json), [report](results/easyplain-all-report.md).
