# S15: field-order control failed, excluded

[Back to the findings index](../../FINDINGS.md) | [Session README](README.md) | [Project README](../../README.md)

S15 produced no scored pairs, so it has no result table. Both calls were excluded from pooled results.

The Qwen3.8 strict smoke stopped after one successful answer. One isolated `strict:false` schema diagnostic also returned the wrong order. Both requested `workShown,answer,admittedKeyUse` and returned `admittedKeyUse,answer,workShown`. Both tested responses were alphabetical; this is not a universal claim about Qwen. There were zero confessions or completed pairs. No post-generation sorting simulated the arm. Both calls are excluded from pooled results, and S15 was dropped. [Exact run/artifact references](../../README.md).

Groq's strict-schema documentation, checked October 1, listed GPT-OSS 20B/120B and Qwen3.8. This limited the available third-family candidates under the free-plus-strict requirements; it is a dated availability check, not a permanent product fact. [Official strict-output source](https://console.groq.com/docs/structured-outputs).
