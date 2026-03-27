import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react"

import {QdsTheme} from "@qualcomm-ui/qds-core/theme"

const THEME_STORAGE_KEY = "app-qds-theme"

interface ThemeContextValue {
  setTheme: (theme: QdsTheme) => void
  theme: QdsTheme
  toggleTheme(): void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Get Tauri invoke if running inside Tauri. Uses dynamic import to avoid
 * breaking when running in a plain browser (dev:ui mode).
 */
let tauriInvoke:
  | ((cmd: string, args?: Record<string, unknown>) => Promise<unknown>)
  | null = null

try {
  const mod = await import("@tauri-apps/api/core")
  tauriInvoke = mod.invoke
} catch {
  // Running outside of Tauri (e.g., browser dev mode)
}

/**
 * Read the initial theme. The inline script in index.html has already set
 * data-theme from localStorage, so we just read it.
 */
function getInitialTheme(): QdsTheme {
  const attr = document.documentElement.getAttribute("data-theme")
  if (attr === QdsTheme.LIGHT || attr === QdsTheme.DARK) {
    return attr
  }
  return localStorage.getItem(THEME_STORAGE_KEY) === QdsTheme.LIGHT
    ? QdsTheme.LIGHT
    : QdsTheme.DARK
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({children}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<QdsTheme>(getInitialTheme)

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const setTheme = useCallback((newTheme: QdsTheme) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    if (tauriInvoke) {
      void tauriInvoke("set_theme", {theme: newTheme})
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === QdsTheme.DARK ? QdsTheme.LIGHT : QdsTheme.DARK
      localStorage.setItem(THEME_STORAGE_KEY, next)
      if (tauriInvoke) {
        void tauriInvoke("set_theme", {theme: next})
      }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{setTheme, theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
