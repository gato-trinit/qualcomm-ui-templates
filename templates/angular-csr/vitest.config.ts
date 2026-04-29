import {playwright} from "@vitest/browser-playwright"
import tsconfigPaths from "vite-tsconfig-paths"
import {defineConfig} from "vitest/config"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    browser: {
      enabled: true,
      instances: [
        {
          browser: "chromium",
          locators: {
            testIdAttribute: "data-test-id",
          },
        },
      ],
      provider: playwright({
        actionTimeout: 3000,
      }),
    },
    globals: true,
    include: ["./src/**/*.spec.ts"],
    setupFiles: ["./test-utils/test-setup.ts"],
  },
})
