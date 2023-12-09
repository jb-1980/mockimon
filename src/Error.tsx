export const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div className="no-mockimon-container">
      <img src="/img/sad-mockachu.png" />
      <h2 style={{ color: "red" }}>Oops! Could not fetch the mockimon data</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}
