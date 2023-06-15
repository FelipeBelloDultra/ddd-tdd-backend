import { resolve } from "node:path";

export default {
  test: {
    coverage: {
      provider: "c8",
    },
  },
  resolve: {
    alias: [
      {
        find: "@modules",
        replacement: resolve(__dirname, "src", "modules"),
      },
      {
        find: "@core",
        replacement: resolve(__dirname, "src", "core"),
      },
      {
        find: "@infra",
        replacement: resolve(__dirname, "src", "infra"),
      },
      {
        find: "@_shared",
        replacement: resolve(__dirname, "src", "modules", "_shared"),
      },
      {
        find: "@test",
        replacement: resolve(__dirname, "src", "test"),
      },
    ],
  },
};
