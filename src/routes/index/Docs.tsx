import "./styles.css"
import list from "../../../public/api/list.json"
import Mockachu from "../../../public/api/mockimon-detail/mockachu.json"
import { JsonBlock } from "../../global-components/JsonBlock"
export const Docs = () => {
  return (
    <div id="documentation">
      <p>
        Welcome to the Mockímon API! This is a really simple resource that is
        useful for teaching and learning the basics of an API.
      </p>
      <h3 style={{ textAlign: "center" }}>
        There are two endpoints available to be queried:
      </h3>
      <section>
        <h3 className="endpoint">
          <span>GET</span> https://mockimon.github.io/api/list.json
        </h3>
        <h4>Returns a list of all the Mockimon available</h4>
        <JsonBlock json={list.slice(0, 5)} />
      </section>
      <section>
        <h3 className="endpoint">
          <span>GET</span>{" "}
          https://mockimon.github.io/api/mockimon-detail/:mockimonId.json
        </h3>
        <h4>Returns details of a specific Mockimon</h4>
        <JsonBlock json={Mockachu} />
      </section>
    </div>
  )
}
