import "./app.css"

import {type ReactNode, useEffect, useMemo, useState} from "react"

import {
  isRouteErrorResponse,
  Links,
  type LinksFunction,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "react-router"

import {getPages} from "@qualcomm-ui/docs-plugin/markdown-content"
import type {SiteData} from "@qualcomm-ui/mdx-common"
import {siteData} from "@qualcomm-ui/mdx-vite-plugin"
import {SiteContextProvider} from "@qualcomm-ui/react-mdx/context"
import {
  isTheme,
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "@qualcomm-ui/react-router-utils/client"

import {MdxLayout} from "./layout"
import {qdsThemeCookie} from "./sessions.server"

export const links: LinksFunction = () => [
  {href: "https://fonts.googleapis.com", rel: "preconnect"},
  {
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com",
    rel: "preconnect",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,400..600&display=swap",
    rel: "stylesheet",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400..500&display=swap",
    rel: "stylesheet",
  },
]

interface RootLoaderData {
  qdsTheme: Theme
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<RootLoaderData> {
  const cookie = request.headers.get("cookie")

  const qdsTheme = await qdsThemeCookie.parse(cookie)

  return {
    qdsTheme: isTheme(qdsTheme) ? qdsTheme : Theme.DARK,
  }
}

export function Layout({children}: {children: ReactNode}) {
  const data = useRouteLoaderData<RootLoaderData>("root")

  const [docsSiteData, setDocsSiteData] = useState<SiteData>(
    siteData ?? {navItems: [], pageMap: {}, searchIndex: []},
  )

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.debug(siteData)
    }
    if (import.meta.hot) {
      import.meta.hot.on("qui-docs-plugin:refresh-site-data", setDocsSiteData)
      return () => {
        import.meta.hot?.off(
          "qui-docs-plugin:refresh-site-data",
          setDocsSiteData,
        )
      }
    }
  }, [])

  const siteContext = useMemo(() => {
    return {
      ...docsSiteData,
      getPages,
    }
  }, [docsSiteData])

  return (
    <SiteContextProvider value={siteContext}>
      <ThemeProvider theme={data?.qdsTheme} themeAction="/action/set-theme">
        {children}
      </ThemeProvider>
    </SiteContextProvider>
  )
}

export default function App() {
  const {qdsTheme: ssrTheme} = useLoaderData<RootLoaderData>()
  const [theme] = useTheme()

  return (
    <ThemeProvider theme={theme} themeAction="/action/set-theme">
      <html
        data-brand="qualcomm"
        data-theme={theme}
        lang="en"
        style={{colorScheme: theme || "dark"}}
      >
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <PreventFlashOnWrongTheme ssrTheme={Boolean(ssrTheme)} />
          <Meta />
          <Links />
        </head>
        <body>
          <MdxLayout>
            <Outlet />
          </MdxLayout>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  )
}

export function ErrorBoundary({
  error,
}: {
  error: {message: string; stack: string; status: number; statusText?: string}
}) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
