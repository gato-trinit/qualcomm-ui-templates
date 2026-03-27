import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
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

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({children}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<QdsTheme>(() => {
    const electronApi = getElectronApi()
    if (electronApi) {
      // In Electron, default to dark; useEffect will fetch the persisted value
      return QdsTheme.DARK
    }
    return localStorage.getItem(THEME_STORAGE_KEY) === QdsTheme.LIGHT
      ? QdsTheme.LIGHT
      : QdsTheme.DARK
  })

  // On mount in Electron, fetch the persisted theme from the main process
  useLayoutEffect(() => {
    const electronApi = getElectronApi()
    if (electronApi) {
      void electronApi.getTheme().then((res) => {
        const stored = res.theme as QdsTheme
        if (stored === QdsTheme.LIGHT || stored === QdsTheme.DARK) {
          setThemeState(stored)
        }
      })
    }
  }, [])

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
