type DeepSeekModel = {
  id: string;
  name?: string;
  contextWindow?: number;
  maxOutput?: number;
};

type DeepSeekPluginConfig = {
  baseUrl?: string;
  api?: string;
  models?: DeepSeekModel[];
  defaultModel?: string;
};

const DEFAULT_BASE_URL = "https://api.deepseek.com/v1";
const DEFAULT_API = "openai-completions";
const DEFAULT_MODELS: DeepSeekModel[] = [
  { id: "deepseek-chat", name: "DeepSeek Chat" },
  { id: "deepseek-reasoner", name: "DeepSeek Reasoner" },
];

export default function register(api: any) {
  api.registerProvider({
    id: "deepseek",
    label: "DeepSeek (OpenAI-compatible)",
    auth: [
      {
        id: "api-key",
        label: "API Key",
        kind: "api-key",
        run: async (ctx: any) => {
          const input = await ctx.prompter.text({
            message: "DeepSeek API key",
            validate: (val: string) => (val?.trim() ? undefined : "API key is required"),
          });

          const apiKey = String(input || "").trim();
          if (!apiKey) {
            throw new Error("DeepSeek API key is required.");
          }

          const pluginConfig: DeepSeekPluginConfig =
            api?.config?.plugins?.entries?.["deepseek-provider"]?.config ?? {};

          const baseUrl = pluginConfig.baseUrl || DEFAULT_BASE_URL;
          const apiType = pluginConfig.api || DEFAULT_API;
          const models = (pluginConfig.models && pluginConfig.models.length > 0)
            ? pluginConfig.models
            : DEFAULT_MODELS;

          const configPatch = {
            models: {
              mode: "merge",
              providers: {
                deepseek: {
                  baseUrl,
                  apiKey,
                  api: apiType,
                  models,
                },
              },
            },
          };

          const defaultModel = pluginConfig.defaultModel
            ? `deepseek/${pluginConfig.defaultModel}`
            : (models[0]?.id ? `deepseek/${models[0].id}` : undefined);

          return {
            profiles: [
              {
                profileId: "deepseek:default",
                credential: {
                  type: "api_key",
                  provider: "deepseek",
                  key: apiKey,
                },
              },
            ],
            configPatch,
            defaultModel,
          };
        },
      },
    ],
  });
}
