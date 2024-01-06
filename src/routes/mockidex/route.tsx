import { RouteConfigFunction } from "../types"
import { Mockidex } from "./Mockidex"

export const MockidexRoute: RouteConfigFunction = (childRoutes) => ({
  path: "mockidex",
  element: <Mockidex />,
  children: childRoutes ?? [],
})
