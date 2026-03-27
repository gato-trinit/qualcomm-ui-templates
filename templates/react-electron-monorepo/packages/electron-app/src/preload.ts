import type {
  ApiRequestType,
  ElectronApi,
  ResponseFor,
  ThemeResponse,
} from "@project/shared-types"
import {contextBridge, ipcRenderer} from "electron"

const api: ElectronApi = {
  getTheme: (): Promise<ThemeResponse> => {
    return ipcRenderer.invoke("ipc::message", {
      data: {},
      requestType: "get-theme",
    }) as Promise<ThemeResponse>
  },
  send: <T extends ApiRequestType>(request: T): Promise<ResponseFor<T>> => {
    return ipcRenderer.invoke("ipc::message", request) as Promise<
      ResponseFor<T>
    >
  },
  setTheme: (theme: string): Promise<ThemeResponse> => {
    return ipcRenderer.invoke("ipc::message", {
      data: {theme},
      requestType: "set-theme",
    }) as Promise<ThemeResponse>
  },
}

contextBridge.exposeInMainWorld("api", api)

// Set data-theme on <html> before page scripts run to prevent theme flash.
// Fetch the theme synchronously, then apply as soon as the DOM is available.
const theme = ipcRenderer.sendSync("ipc::get-theme-sync") as string
document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.documentElement.setAttribute("data-theme", theme)
    document.documentElement.style.colorScheme = theme
  },
  {once: true},
)
