import { defineConfig } from "vitest/config";

import vitestDefaultConfig from "./vitest.default.config";

export default defineConfig({
  test: {
    threads: false,
    include: ["src/**/*.e2e.spec.ts"],
    globalSetup: ["src/test/database/setup.ts"],
  },
  resolve: {
    alias: vitestDefaultConfig.resolve.alias,
  },
});
