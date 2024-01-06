import { RouteConfigFunction } from "../types"
import { Docs } from "./Docs"

export const IndexRoute: RouteConfigFunction = () => ({
  path: "/",
  element: <Docs />,
})
