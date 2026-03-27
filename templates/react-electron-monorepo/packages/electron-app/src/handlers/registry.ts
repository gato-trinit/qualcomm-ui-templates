import {
  ApiRequest,
  type ApiRequestType,
  type ResponseFor,
} from "@project/shared-types"
import {ipcMain} from "electron"

import {exampleRequest} from "./example-request"
import {getTheme} from "./get-theme"
import {openExternalUrl} from "./open-external-url"
import {setTheme} from "./set-theme"

/**
 * A function that processes the data payload for a specific {@link ApiRequestType}
 * and returns the response type associated with that request.
 */
type Handler<T extends ApiRequestType> = (
  data: T["data"],
) => T["response"] | Promise<T["response"]>

/**
 * Maps each {@link ApiRequest} to its handler function. To add a new command,
 * create a handler module and add an entry here — the type system will enforce
 * that every request type has a corresponding handler with the correct return type.
 */
const handlers: {
  [K in ApiRequestType["requestType"]]: Handler<
    Extract<ApiRequestType, {requestType: K}>
  >
} = {
  [ApiRequest.EXAMPLE_REQUEST]: exampleRequest,
  [ApiRequest.GET_THEME]: getTheme,
  [ApiRequest.OPEN_EXTERNAL_URL]: openExternalUrl,
  [ApiRequest.SET_THEME]: setTheme,
}

/**
 * Registers the `ipc::message` handler on {@link ipcMain}. Call once during
 * app initialization (before any renderer process sends a message).
 */
export function registerHandlers() {
  ipcMain.handle(
    "ipc::message",
    <T extends ApiRequestType>(
      _: Electron.IpcMainInvokeEvent,
      args: T,
    ): ResponseFor<T> => {
      const handler = handlers[args.requestType]
      return handler(args.data as never) as ResponseFor<T>
    },
  )
}
