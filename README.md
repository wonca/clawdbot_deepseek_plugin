# DeepSeek Provider (Clawdbot plugin)

OpenAI‑compatible DeepSeek provider for Clawdbot. Adds `deepseek` provider auth and writes `models.providers.deepseek` config.

## Install (local dev)

```bash
# from your repo root
clawdbot plugins enable deepseek-provider
# or add to clawdbot.json plugins.load.paths
```

## Login

```bash
clawdbot models auth login --provider deepseek
```

## Config (optional)

```json5
plugins: {
  entries: {
    "deepseek-provider": {
      enabled: true,
      config: {
        baseUrl: "https://api.deepseek.com/v1",
        api: "openai-completions",
        models: [
          { id: "deepseek-chat", name: "DeepSeek Chat" },
          { id: "deepseek-reasoner", name: "DeepSeek Reasoner" }
        ],
        defaultModel: "deepseek-chat"
      }
    }
  }
}
```

## Notes
- This plugin uses Clawdbot’s provider auth flow (API key).
- Models are registered under `deepseek/<model-id>`.
- After setup, `clawdbot models list` may not show DeepSeek by default (it only lists configured defaults). Use:

```bash
clawdbot models list --all --provider deepseek --plain
```

To show DeepSeek in the default list without changing the primary model, add:

```json5
agents: {
  defaults: {
    models: {
      "deepseek/deepseek-chat": {},
      "deepseek/deepseek-reasoner": {}
    }
  }
}
```
