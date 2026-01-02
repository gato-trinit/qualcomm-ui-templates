import {index, layout, route, type RouteConfig} from "@react-router/dev/routes"

export default [
  route("action/set-theme", "./routes/action.set-theme.ts"),
  layout("./routes/layout.tsx", [index("./routes/home.tsx")]),
] satisfies RouteConfig
