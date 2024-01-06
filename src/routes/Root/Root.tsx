import { NavLink, Outlet } from "react-router-dom"

import "./styles.css"

export const Root = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}

const MainHeader = () => {
  return (
    <nav className="navbar">
      <div>
        <h1 className="logo">Mockímon API</h1>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <NavLink to="/">Docs</NavLink>
          <NavLink to="/mockidex">Mockidex</NavLink>
        </div>
      </div>
    </nav>
  )
}
