import type { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./schemas/schema.ts",
  outputPath: "../store/src/types/sanity-schema.ts",
};

export default config;
