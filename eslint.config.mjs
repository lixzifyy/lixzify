import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Freebuff Sites generated config + build output (git-ignored):
    "freebuff-sites-build/**",
    ".open-next/**",
    ".wrangler/**",
    "freebuff.open-next.config.ts",
    "freebuff.wrangler.jsonc",
  ]),
]);

export default eslintConfig;
