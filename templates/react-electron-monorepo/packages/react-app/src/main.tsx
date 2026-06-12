import {createRoot} from "react-dom/client"

import {HashRouter} from "react-router"

import {Root} from "./root"
import {ThemeProvider} from "./theme-provider"

import "./index.css"

const root = document.getElementById("root")!

createRoot(root).render(
  <HashRouter basename="/">
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </HashRouter>,
)
