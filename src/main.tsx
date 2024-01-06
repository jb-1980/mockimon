import React from "react"
import ReactDOM from "react-dom/client"
import "./styles.css"
import { RouterProvider, createHashRouter } from "react-router-dom"
import { RootRoute } from "./routes/Root/route"
import { IndexRoute } from "./routes/index/route"
import { MockidexRoute } from "./routes/mockidex/route"
import { MockiDetailRoute } from "./routes/mockidex.$mockiId/route"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("No root element found")
}

const router = createHashRouter([
  RootRoute([IndexRoute(), MockidexRoute([MockiDetailRoute()])]),
])

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
