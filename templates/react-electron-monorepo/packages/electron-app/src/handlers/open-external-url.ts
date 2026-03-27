import {ApiRequest, type SimpleApiResponse} from "@project/shared-types"
import {shell} from "electron"

export async function openExternalUrl(data: {
  url: string
}): Promise<SimpleApiResponse> {
  try {
    await shell.openExternal(data.url)
  } catch (error) {
    return {
      message: `Failed to open URL: ${error instanceof Error ? error.message : String(error)}`,
      requestType: ApiRequest.OPEN_EXTERNAL_URL,
    }
  }

  return {
    message: `Opened: ${data.url}`,
    requestType: ApiRequest.OPEN_EXTERNAL_URL,
  }
}
