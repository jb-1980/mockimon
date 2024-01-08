import { MockimonDetail } from "./MockimonDetail"
import { RouteConfigFunction } from "../types"

export const MockiDetailRoute: RouteConfigFunction = () => ({
  path: ":mockiId",
  element: <MockimonDetail />,
  loader: async ({ params }) =>
    await fetch(`/api/mockimon-detail/${params.mockiId}.json`).then(
      (res) => res.json() as Promise<MockimonQuery>
    ),
})
