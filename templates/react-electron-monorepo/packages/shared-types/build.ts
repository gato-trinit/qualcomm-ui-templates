import type {BuildOptions} from "esbuild"

import {buildOrWatch, hasArg, logPlugin} from "@qualcomm-ui/esbuild"

async function main(argv: string[]) {
  const IS_WATCH = hasArg(argv, "--watch")

  const buildOpts: BuildOptions = {
    bundle: true,
    entryPoints: ["./src/index.ts"],
    external: [],
    metafile: true,
    minify: true,
    outfile: "dist/index.js",
    platform: "node",
    sourcemap: true,
    target: "es2023",
    tsconfig: "tsconfig.lib.json",
  }

  await Promise.all([
    buildOrWatch(
      {
        ...buildOpts,
        format: "esm",
        logLevel: IS_WATCH ? "error" : "warning",
        plugins: [logPlugin({bundleSizeOptions: {logMode: "both"}})],
      },
      IS_WATCH,
    ),
  ])
}

void main(process.argv)
