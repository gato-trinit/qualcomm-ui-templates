import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  build: {
    emptyOutDir: true,
    outDir: "dist",
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    transformer: "postcss",
  },
  plugins: [tailwindcss(), react()],
})
