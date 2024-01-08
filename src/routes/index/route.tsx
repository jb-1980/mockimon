import { RouteConfigFunction } from "../types"
import { Docs } from "./Docs"

export const IndexRoute: RouteConfigFunction = () => ({
  path: "/",
  element: <Docs />,
  loader: async () => {
    const [list, Mockachu] = await Promise.all([
      fetch("/api/list.json").then(
        (res) => res.json() as Promise<MockimonList>
      ),
      fetch("/api/mockimon-detail/mockachu.json").then(
        (res) => res.json() as Promise<MockimonQuery>
      ),
    ])
    return { list, Mockachu }
  },
})
