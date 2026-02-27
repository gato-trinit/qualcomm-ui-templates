import type {NextConfig} from "next"
import {cwd} from "node:process"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // resolve font issues from behind VPN
    turbopackUseSystemTlsCerts: true,
  },
  turbopack: {
    root: cwd(),
  },
}

export default nextConfig
