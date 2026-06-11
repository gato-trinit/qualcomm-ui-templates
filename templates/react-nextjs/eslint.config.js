import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import {defineConfig, globalIgnores} from "eslint/config"
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

// the import plugin is already declared by Next.js configs, so we pull it out
const [ogConfig] = quiEslintTs.configs.styleGuide
const {
  plugins: {import: _import, ...plugins},
} = ogConfig

const styleGuide = {
  ...ogConfig,
  plugins,
}

const eslintConfig = defineConfig([
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/coverage/",
    "**/temp/",
  ]),
  // JS
  {
    extends: [
      quiEslintTs.configs.sortKeys,
      quiEslintTs.configs.styleGuide,
      quiEslintTs.configs.namingConventions,
    ],
    files: ["**/*.{js,mjs,cjs}"],
  },
  // TS
  {
    extends: [
      nextVitals,
      nextTs,
      styleGuide,
      quiEslintTs.configs.sortKeys,
      quiEslintTs.configs.namingConventions,
      quiEslintTs.configs.typeChecks,
      quiEslintTs.configs.strictExports,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: tsLanguageOptions,
  },
  // React
  {
    extends: [quiEslintReact.configs.recommended, quiEslintPluginReact.config],
    files: ["**/*.{ts,tsx}"],
    languageOptions: tsLanguageOptions,
  },
])

export default eslintConfig
