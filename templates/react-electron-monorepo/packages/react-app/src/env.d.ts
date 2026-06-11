import type {ElectronApi} from "@project/shared-types"

declare global {
  interface Window {
    api: ElectronApi
  }
}
