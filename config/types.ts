export interface buildPaths {
  entry: string;
  output: string;
  html: string;
  src: string;
  server: string;
  shared: string,
  public: string,
  favicon: string,
  types: string
}

export type buildMode = "production" | "development";

export type buildPlatform = "monile" | "desktop";

export interface BuildOptions {
  port: number;
  paths: buildPaths;
  mode: buildMode;
  platform: buildPlatform;
  analyzer?: boolean;
}
