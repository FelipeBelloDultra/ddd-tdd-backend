import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    globals: true,
    alias: [
      {
        find: "~",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
});
