<!-- [Instinct] Isolate approved S15 Qwen contrast, preserve S14 evidence unchanged and document model-specific reasoning transport. -->
# S15: Qwen3.8-27B on Groq

Status: STOPPED October 1, 2026. Strict-on smoke and one strict-off diagnostic each returned a successful answer in the wrong field order. Zero completed pairs, zero confessions, no full run. The owner closed the experiment phase; do not dispatch again.

Both requested `workShown,answer,admittedKeyUse` and returned `admittedKeyUse,answer,workShown`. Both tested responses used alphabetical field order; no universal model claim is established. The two answer-only calls are excluded from pooled results. See the [root comparison](../../README.md).

- Strict smoke: https://github.com/bettercall-gautam/agent-swarm-exp/actions/runs/36870546427
- Relaxed schema diagnostic: https://github.com/bettercall-gautam/agent-swarm-exp/actions/runs/36871169396

The remaining text records preparation, not permission to run.

Copied S14 question bank byte-identically and preserved its answer prompts, three arms/rotation, temperatures0.7answer/0confession,8000completion cap,strict JSON schema and explicit confession suffix.25questions x3arms=75pairs/150nominal successful calls. Smoke6pairs/12successful calls maximum, separately stored. Full starts separately, restores previous full artifacts across batches, never mixes smoke/earlier-session rows.

Changed model to `qwen/qwen3.8-27b`. Explicit `reasoning_effort:low` and model-specific `reasoning_format:parsed` preserve separate returned reasoning without adding it to history. Groq's specific3.8card supports low; general reasoning/API docs still list only default/none for Qwen, so smoke must verify actual acceptance. Same effort label does not establish equal reasoning/capability across models. JSON answer-first is field order, not before provider reasoning. Strict schema does not prove key-order enforcement; actual order audited and mismatch stops.

Setup hash: `510456de5cfd875a8790f0f150e9a5000f7886fd1c1c39f070eb8d4b43850d78`. Preview exposes exact prompts/schemas/settings without a key or call. All model outputs, returned reasoning,usage,rate headers,attempts/checkpoints preserved. Offline reviews never call a model. Work-quality correctness remains null unless a blind review is done.

Adaptive pacing estimates next token reservation from input length and same-phase completion history;4.5second minimum,65second missing-header fallback,one bounded429 Retry-After retry. Actual reservations/organization traffic unknown. Current published Free Plan Limits30RPM,1000RPD,8KTPM,200KTPD fit150calls nominally, not a guarantee of enough remaining daily quota or Qwen token use. Headers tokens=TPM,requests=RPD,not daily-token remainder. Cached tokens excluded by published rules.

Same repository secret `GROQ_API_KEY`,CI environment only. Provenance labels are nonsecret identifiers, not verified provider account IDs. Initial label groq-account-1. Daily limit: preserve/report to owner, no silent new key/account. Known returned429 confession checkpoint can resume its exact saved answer without regeneration; other pending states stop for reviewed recovery. No fresh75-pair reruns, no silent config/model fallbacks.

Primary contrast within Qwen; Gemini/gpt-oss secondary descriptive only. Model capability,effort semantics,cap and format companion differences limit comparisons. Lower reasoning may reduce independent solving and increase attraction to leaked key, a threat to validity not measured causal effect. This is a preview model and can change/discontinue. No claim it is universally best or proven more accurate.

Sources verified October1:
- https://console.groq.com/docs/model/qwen/qwen3.8-27b (JSON Schema,reasoning controls,parsed output,max16Kcompletion)
- https://console.groq.com/docs/structured-outputs (strict3.8support)
- https://console.groq.com/docs/rate-limits (browser-selected FREE tab)
- https://console.groq.com/docs/models (preview status)
- https://console.groq.com/docs/reasoning and https://console.groq.com/docs/api-reference (conflicting general effort docs)

Workflow: [.github/workflows/s15-qwen.yml](../../.github/workflows/s15-qwen.yml), smoke default, full bounded batches and same-mode `source_run_id` restore. Download complete artifact `s15-qwen-<mode>-<runid>-<attempt>`,including failures. Full requires reviewed smoke.75pair target is not75questions.
