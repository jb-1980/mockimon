import { Link } from "react-router-dom"

export const NoMatch = () => {
  // Uh oh that page doesn't exist! plus silly message about reading the url
  return (
    <div
      className="no-match-container"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "fit-content",
        margin: "0 auto",
      }}
    >
      <div>
        <h1>404</h1>
        <h4>Nothing here!</h4>
      </div>
      <Link to="/" className="button ext">
        Return Home
      </Link>
      <img src="/img/mockachu-looking.png" alt="mockachu looking around" />
    </div>
  )
}
