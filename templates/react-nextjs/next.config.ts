import type {NextConfig} from "next"
import {cwd} from "node:process"

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: cwd(),
  },
}

export default nextConfig
