export const JsonBlock = ({ json }: { json: object }) => {
  if (Object.keys(json).length === 0) {
    return null
  }

  let jsonString = JSON.stringify(json, undefined, 2)
  jsonString = jsonString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  jsonString = jsonString.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "number"
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key"
        } else {
          cls = "string"
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean"
      } else if (/null/.test(match)) {
        cls = "null"
      }
      return `<span class='${cls}'>${match}</span>`
    }
  )

  return (
    <div className="json-box">
      <code dangerouslySetInnerHTML={{ __html: jsonString }} />
    </div>
  )
}
