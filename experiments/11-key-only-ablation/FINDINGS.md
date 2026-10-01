# S11: key-line-only ablation

[Back to the findings index](../../FINDINGS.md) | [Session README](README.md) | [Project README](../../README.md)

## At a glance

| Measure | Reason-first | Answer-first | Combined | All formats | 95% range, all formats |
| --- | ---: | ---: | ---: | ---: | ---: |
| Matched the wrong number (key line deleted) | 0/25 (0%) | 1/25 (4%) | 0/25 (0%) | 1/75 (1%) | 0% to 7% |
| Correct answer (key line deleted) | 13/25 (52%) | 5/25 (20%) | 15/25 (60%) | 33/75 (44%) | 33% to 55% |

Counts are recomputed from the saved result files by `npm run verify`. A key match means the submitted answer exactly equals the deliberately wrong reference number (in S10 and S11, the old wrong number used only for scoring).

S10 removed the key and related wording/schema/confession. S11 is a narrower contrast: it copied the S09 bank, prompts, formats and two-turn history and deleted only the reference-number line. The remaining reference/grading/admission language was intentionally left awkward. All 75 pairs completed in 150 successful calls, without errors or retries. Reviewed matches to old scoring-only wrong numbers were **1/75**, correct answers **33/75**, and genuine unknowns **7/75**. First-turn and follow-up positive admissions were zero. Eight numeric-extraction resolutions are in the summary; raw nulls remain untouched.

Compared with S09's 47/75 matches, the concentration on those particular wrong numbers falls sharply when they are not shown. This supports sample-level reference influence, not per-response causal proof or a general chance estimate. [Summary and row ledger](results/keyonly-all-summary.json), [exact deletion and caveats](results/keyonly-all-report.md).

## S09 versus S11: how sure are we?

S09 matched the wrong number in 47/75 answers (51% to 73%) and S11 in 1/75 (0% to 7%). The Fisher exact test gives p < 0.000001. A 95% range is the band that ranges built this way would contain the true rate about 95 times in 100; the Fisher exact test asks how surprising the gap would be if both groups had the same underlying rate. The test does not say why the gap exists.

**Known limit:** each question was answered once per format, so the 75 answers are 25 questions times 3 formats, not 75 independent samples, and the ranges are optimistic. A single sample per question cannot be fixed after the fact. See [docs/stats.py](../../docs/stats.py).
