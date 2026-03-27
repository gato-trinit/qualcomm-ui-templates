import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react"

import type {ElectronApi} from "@project/shared-types"

import {QdsTheme} from "@qualcomm-ui/qds-core/theme"

const THEME_STORAGE_KEY = "app-qds-theme"

interface ThemeContextValue {
  setTheme: (theme: QdsTheme) => void
  theme: QdsTheme
  toggleTheme(): void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getElectronApi(): ElectronApi | undefined {
  if (typeof window !== "undefined" && "api" in window) {
    return (window as unknown as {api: ElectronApi}).api
  }
  return undefined
}

/**
 * Read the initial theme. In Electron the preload has already set data-theme
 * on <html> synchronously, so we just read it. In browser mode we fall back
 * to localStorage.
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

  // Apply theme to DOM whenever it changes
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const setTheme = useCallback((newTheme: QdsTheme) => {
    setThemeState(newTheme)
    const electronApi = getElectronApi()
    if (electronApi) {
      void electronApi.setTheme(newTheme)
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === QdsTheme.DARK ? QdsTheme.LIGHT : QdsTheme.DARK
      const electronApi = getElectronApi()
      if (electronApi) {
        void electronApi.setTheme(next)
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, next)
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
