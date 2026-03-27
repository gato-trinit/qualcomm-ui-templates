import type {MouseEvent, ReactElement} from "react"

import {ApiRequest, type ApiRequestType} from "@project/shared-types"

import {Link, type LinkProps} from "@qualcomm-ui/react/link"

export interface ExternalLinkProps extends LinkProps {
  href: string
}

export function ExternalLink({
  href,
  onClick,
  ...rest
}: ExternalLinkProps): ReactElement {
  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    void window.api.send({
      data: {url: href},
      requestType: ApiRequest.OPEN_EXTERNAL_URL,
    } as ApiRequestType)
    onClick?.(event)
  }

  return <Link href={href} onClick={handleClick} {...rest} />
}
