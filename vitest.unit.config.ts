import { defineConfig } from "vitest/config";

import vitestDefaultConfig from "./vitest.default.config";

export default defineConfig({
  test: {
    threads: false,
    include: ["src/**/*.spec.ts", "!src/**/*.e2e.spec.ts"],
  },
  resolve: {
    alias: vitestDefaultConfig.resolve.alias,
  },
});
