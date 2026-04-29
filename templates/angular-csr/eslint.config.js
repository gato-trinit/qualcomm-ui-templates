import {defineConfig} from "eslint/config"
import globals from "globals"
import * as tseslint from "typescript-eslint"

import quiEslintAngular from "@qualcomm-ui/eslint-config-angular"
import quiEslintTs from "@qualcomm-ui/eslint-config-typescript"

const tsLanguageOptions = {
  globals: globals.browser,
  parser: tseslint.parser,
  parserOptions: {
    projectService: true,
  },
}

export default defineConfig([
  {
    ignores: [
      "**/.angular/",
      "**/dist/",
      "**/node_modules/",
      "**/build/",
      "**/coverage/",
      "**/.turbo/",
      "**/out/",
      "**/out-tsc/",
      "**/temp/",
      "**/vite.config.ts.timestamp*",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  // JS
  {
    extends: [
      quiEslintTs.configs.base,
      quiEslintTs.configs.sortKeys,
      quiEslintTs.configs.styleGuide,
    ],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {globals: globals.browser},
  },
  // TS
  {
    extends: [
      ...quiEslintTs.configs.recommended,
      quiEslintTs.configs.performance,
      quiEslintTs.configs.strictExports,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: tsLanguageOptions,
  },
  // Angular
  {
    extends: [
      ...quiEslintTs.configs.recommended,
      quiEslintTs.configs.performance,
      quiEslintAngular.configs.baseTypescript,
      quiEslintAngular.configs.typescript,
    ],
    files: ["src/**/*.ts"],
    languageOptions: tsLanguageOptions,
  },
  {
    extends: [
      quiEslintAngular.configs.baseTemplate,
      quiEslintAngular.configs.templatePrettier,
      quiEslintAngular.configs.templateAttributeOrder,
      quiEslintAngular.configs.templateSelfClosingTags,
    ],
    files: ["src/**/*.html"],
  },
])
