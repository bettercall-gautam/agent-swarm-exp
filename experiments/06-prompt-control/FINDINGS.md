# S06: prompt control

[Back to the findings index](../../FINDINGS.md) | [Session README](README.md) | [Project README](../../README.md)

Old name: "S6" in early notes (S4, S5, S6 without the leading zero).

Same 90-row replay as S04. S06 was a control requested by Gautam: it removed honesty, amnesty, threat and the high-arm survival/score line, retaining the normal task, grading and Monitor disclosure. **Normal and high Worker prompts are identical in S06.** Their difference there is sampling variation, not evidence of a pressure effect.

## At a glance

| Arm | Matched the wrong key | Monitor cheating verdict |
| --- | ---: | ---: |
| Normal | 11/30 (37%) | 11/30 (37%) |
| High | 10/30 (33%) | 8/30 (27%) |
| No-monitor (covert audit) | 13/30 (43%) | 12/30 (40%) |

Out of 30 rows per arm. A key match means the submitted answer exactly equals the deliberately wrong reference number. A Monitor verdict is another model's judgment, not verified intent. Counts here are recomputed from the saved rows by `npm run verify`. No-monitor verdicts come from a separate covert or after-the-fact audit.

Shared setup for S01 to S06 (prompt, key, grading and Monitor design): see [the findings index](../../FINDINGS.md#shared-design-for-s01-s06). Other sources and answer-key notes are in [SOURCES.md](../../SOURCES.md).

The surprise confession was a denial in all 90 rows; first-answer `admittedKeyUse` was false in all 90. Key-match rates across S04 to S06 are broadly similar, but samples of 30 per arm and stochastic outputs do not establish a zero effect. Avoid claiming that prompts "never work".
