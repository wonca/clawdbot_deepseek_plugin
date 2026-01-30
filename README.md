# DeepSeek Provider (Clawdbot plugin)

OpenAI‑compatible DeepSeek provider for Clawdbot. Adds `deepseek` provider auth and writes `models.providers.deepseek` config.

## Install (local dev)

**Recommended location:**
```
~/.clawdbot/extensions/clawdbot_deepseek_plugin
```

Clone into the extensions directory so the plugin can be discovered:
```bash
mkdir -p ~/.clawdbot/extensions
cd ~/.clawdbot/extensions

git clone git@github.com:wonca/clawdbot_deepseek_plugin.git
```

> The default folder name will be `clawdbot_deepseek_plugin` (normal for GitHub repos).

Enable the plugin:
```bash
clawdbot plugins enable deepseek-provider
```

(Alternative) You can also point to the folder via `plugins.load.paths` in `clawdbot.json`.

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

## Set DeepSeek as default (global)

```bash
clawdbot models set deepseek/deepseek-chat
```

## Set DeepSeek for a specific agent

```bash
clawdbot agents add deesee --workspace ~/clawd-deesee --model deepseek/deepseek-chat --non-interactive
# or update an existing agent in clawdbot.json:
# agents.list[].model.primary = "deepseek/deepseek-chat"
```

> You can also hand this document to Clawdbot and it will perform the steps for you.
> 你也可以把这篇文档交给 Clawdbot，它自己会操作。
