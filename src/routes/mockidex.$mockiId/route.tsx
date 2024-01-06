import { MockimonDetail } from "./MockimonDetail"
import { RouteConfigFunction } from "../types"

export const MockiDetailRoute: RouteConfigFunction = () => ({
  path: ":mockiId",
  element: <MockimonDetail />,
})
