import type {ElectronApi} from "@project/shared-types"

declare module "*.css"

declare global {
  interface Window {
    api: ElectronApi
  }
}
