import {ApiRequest, type ThemeResponse} from "@project/shared-types"

import {store} from "../store"

export function setTheme(data: {theme: string}): ThemeResponse {
  const theme = data.theme === "light" ? "light" : "dark"
  store.set("theme", theme)
  return {requestType: ApiRequest.SET_THEME, theme}
}
