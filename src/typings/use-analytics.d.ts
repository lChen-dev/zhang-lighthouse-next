declare module 'use-analytics';
declare module '@analytics/segment' {
  type PluginConfig = {
    writeKey: string;
    disableAnonymousTraffic?: boolean;
    customScriptSrc?: boolean;
    integrations?: object;
  };
  export default function segmentPlugin(pluginConfig?: PluginConfig);
}
