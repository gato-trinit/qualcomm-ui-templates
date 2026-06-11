import {defineConfig} from "eslint/config"
import * as tseslint from "typescript-eslint"

import quiEslintReact from "@qualcomm-ui/eslint-config-react"
import quiEslintTs from "@qualcomm-ui/eslint-config-typescript"
import quiEslintPluginReact from "@qualcomm-ui/eslint-plugin-react"

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
      quiEslintTs.configs.sortKeys,
      quiEslintTs.configs.styleGuide,
      quiEslintTs.configs.namingConventions,
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
  // React
  {
    extends: [
      quiEslintTs.configs.recommended,
      quiEslintReact.configs.recommended,
      // optional: include the plugin as well
      quiEslintPluginReact.config,
    ],
    // recommendation: scope these to your source files in your package(s).
    files: ["**/*.{ts,tsx}"],
    languageOptions: tsLanguageOptions,
  },
])

export default eslintConfig
