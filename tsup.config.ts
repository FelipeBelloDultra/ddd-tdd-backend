import { defineConfig } from "tsup";

export default defineConfig({
  tsconfig: "./tsconfig.build.json",
  clean: true,
  minify: true,
  target: "es2022",
});
