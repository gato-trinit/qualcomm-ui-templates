import type {ReactNode} from "react"

import {
  isRouteErrorResponse,
  Links,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "react-router"

import {
  isTheme,
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
  useTheme,
} from "@qualcomm-ui/react-router-utils/client"

import type {Route} from "./+types/root"
import {qdsThemeCookie} from "./sessions.server"

import "./app.css"

export const links: Route.LinksFunction = () => [
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

  return (
    <ThemeProvider theme={data?.qdsTheme} themeAction="/action/set-theme">
      {children}
    </ThemeProvider>
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
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  )
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
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
