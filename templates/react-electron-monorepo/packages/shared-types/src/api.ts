export const ApiRequest = {
  EXAMPLE_REQUEST: "example-request",
  GET_THEME: "get-theme",
  OPEN_EXTERNAL_URL: "open-external-url",
  SET_THEME: "set-theme",
} as const

export type ApiRequest = (typeof ApiRequest)[keyof typeof ApiRequest]

/**
 * Discriminated unions in TypeScript are used to represent a value that could be
 * one of a few different types. They are a way of adding more information to a union
 * type, so that the compiler can know which type of value is actually being used.
 * also see: packages/electron-app/main.ts
 */
export type ApiRequestType =
  | {
      data: {message: string}
      requestType: typeof ApiRequest.EXAMPLE_REQUEST
      response: SimpleApiResponse
    }
  | {
      data: {url: string}
      requestType: typeof ApiRequest.OPEN_EXTERNAL_URL
      response: SimpleApiResponse
    }
  | {
      data: Record<string, never>
      requestType: typeof ApiRequest.GET_THEME
      response: ThemeResponse
    }
  | {
      data: {theme: string}
      requestType: typeof ApiRequest.SET_THEME
      response: ThemeResponse
    }

/** Extracts the response type for a given request. */
export type ResponseFor<T extends ApiRequestType> = Extract<
  ApiRequestType,
  {requestType: T["requestType"]}
>["response"]

export interface SimpleApiResponse {
  message: string
  requestType: ApiRequest
}

export interface ThemeResponse {
  requestType: ApiRequest
  theme: string
}

export interface ElectronApi {
  getTheme: () => Promise<ThemeResponse>
  send: <T extends ApiRequestType>(request: T) => Promise<ResponseFor<T>>
  setTheme: (theme: string) => Promise<ThemeResponse>
}
