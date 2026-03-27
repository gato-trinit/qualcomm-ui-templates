import {ApiRequest, type ThemeResponse} from "@project/shared-types"

import {store} from "../store"

export function getTheme(): ThemeResponse {
  return {requestType: ApiRequest.GET_THEME, theme: store.get("theme")}
}
