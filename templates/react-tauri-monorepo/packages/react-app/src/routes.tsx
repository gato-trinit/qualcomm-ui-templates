import {Route, Routes} from "react-router"

import {HomePage} from "./pages/home"

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
    </Routes>
  )
}
