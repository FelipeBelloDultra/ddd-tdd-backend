import { defineConfig } from "vitest/config";

import vitestDefaultConfig from "./vitest.default.config";

export default defineConfig({
  test: {
    threads: false,
    include: ["src/**/*.spec.ts"],
    globalSetup: ["src/test/database/setup.ts"],
    coverage: {
      provider: vitestDefaultConfig.test.coverage.provider as "c8",
    },
  },
  resolve: {
    alias: vitestDefaultConfig.resolve.alias,
  },
});
