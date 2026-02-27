import "./globals.css"
import type {ReactNode} from "react"

import type {Metadata} from "next"
import {Roboto_Flex, Roboto_Mono} from "next/font/google"
import {cookies} from "next/headers"

import type {QdsTheme} from "@qualcomm-ui/qds-core/theme"

import {AppLayout} from "./components/app-layout"
import {ThemeProvider} from "./components/theme-provider"

const sansFont = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  weight: ["400", "500", "600"],
})

const monoFont = Roboto_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  description: "A QUI starter application",
  title: "Qualcomm App",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get("app-qds-theme")
  const theme: QdsTheme = themeCookie?.value === "light" ? "light" : "dark"

  return (
    <html
      data-brand="qualcomm"
      data-theme={theme}
      lang="en"
      style={{colorScheme: theme}}
    >
      <head>
        <link href="https://use.typekit.net/nhs4wvu.css" rel="stylesheet" />
      </head>
      <body className={`${sansFont.variable} ${monoFont.variable} antialiased`}>
        <ThemeProvider defaultTheme={theme}>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
