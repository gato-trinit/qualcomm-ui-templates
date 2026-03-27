import {ApiRequest, type SimpleApiResponse} from "@project/shared-types"

export function exampleRequest(data: {message: string}): SimpleApiResponse {
  return {
    message: `Hello world! You sent: ${data.message}`,
    requestType: ApiRequest.EXAMPLE_REQUEST,
  }
}
