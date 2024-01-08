import { RouteConfigFunction } from "../types"
import { Mockidex } from "./Mockidex"

export const MockidexRoute: RouteConfigFunction = (childRoutes) => ({
  path: "mockidex",
  element: <Mockidex />,
  loader: () => fetch("/api/list.json").then((res) => res.json()),
  children: childRoutes ?? [],
})
