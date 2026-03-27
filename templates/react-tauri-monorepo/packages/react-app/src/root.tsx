import {Layers2, Minus, Moon, Square, Sun, X} from "lucide-react"

import {QdsTheme} from "@qualcomm-ui/qds-core/theme"
import {HeaderBar} from "@qualcomm-ui/react/header-bar"
import {Icon} from "@qualcomm-ui/react/icon"

import {AppRoutes} from "./routes"
import {useTheme} from "./theme-provider"
import {tauriWindow} from "./utils/tauri-window"

export function Root() {
  const {theme, toggleTheme} = useTheme()

  return (
    <div className="min-h-screen w-full">
      <HeaderBar.Root data-tauri-drag-region>
        <HeaderBar.Logo>
          <div className="bg-category-1-subtle rounded-sm p-0.5">
            <Icon icon={Layers2} size="lg" />
          </div>
          <HeaderBar.AppTitle>My App</HeaderBar.AppTitle>
        </HeaderBar.Logo>

        <HeaderBar.Divider />

        <HeaderBar.Nav />

        <HeaderBar.ActionBar>
          <HeaderBar.ActionIconButton
            aria-label="Toggle Theme"
            icon={theme === QdsTheme.LIGHT ? Sun : Moon}
            onClick={toggleTheme}
          />
          <HeaderBar.Divider className="mx-2" />
          <HeaderBar.ActionIconButton
            aria-label="Minimize"
            icon={Minus}
            onClick={() => void tauriWindow.minimize()}
            type="button"
          />
          <HeaderBar.ActionIconButton
            aria-label="Maximize"
            icon={Square}
            onClick={() => void tauriWindow.toggleMaximize()}
            type="button"
          />
          <HeaderBar.ActionIconButton
            aria-label="Close"
            icon={X}
            onClick={() => void tauriWindow.close()}
            type="button"
          />
        </HeaderBar.ActionBar>
      </HeaderBar.Root>

      <div className="p-6">
        <AppRoutes />
      </div>
    </div>
  )
}
