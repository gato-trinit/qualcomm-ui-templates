import mdx from "@mdx-js/rollup"
import {reactRouter} from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import {defineConfig} from "vite"

import {
  frontmatterHmrPlugin,
  getRehypePlugins,
  getRemarkPlugins,
  quiDocsPlugin,
} from "@qualcomm-ui/mdx-vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    mdx({
      providerImportSource: "@mdx-js/react",
      rehypePlugins: [...getRehypePlugins()],
      remarkPlugins: [...getRemarkPlugins()],
    }),
    reactRouter(),
    quiDocsPlugin(),
    frontmatterHmrPlugin(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
