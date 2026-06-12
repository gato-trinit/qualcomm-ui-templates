import {defineConfig} from "eslint/config"
import * as tseslint from "typescript-eslint"

import quiEslintTs from "@qualcomm-ui/eslint-config-typescript"

const tsLanguageOptions = {
  parser: tseslint.parser,
  parserOptions: {
    projectService: true,
  },
}

const eslintConfig = defineConfig([
  {
    ignores: [
      "**/dist/",
      "**/node_modules/",
      "**/build/",
      "**/coverage/",
      "**/.turbo/",
      "**/out/",
      "**/out-tsc/",
      "**/temp/",
      "**/.react-router/",
    ],
  },
  // JS
  {
    extends: [
      quiEslintTs.configs.namingConventions,
      quiEslintTs.configs.sortKeys,
      quiEslintTs.configs.styleGuide,
    ],
    // recommendation: scope these to your source files in your package(s).
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
  },
  // TS
  {
    extends: [
      quiEslintTs.configs.recommended,
      quiEslintTs.configs.strictExports,
    ],
    // recommendation: scope these to your source files in your package(s).
    files: ["**/*.ts"],
    languageOptions: tsLanguageOptions,
  },
])

export default eslintConfig
