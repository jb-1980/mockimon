import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom"
import { useEffect } from "react"
import "./styles.css"
import Select from "react-select"

export const Mockidex = () => {
  const { mockiId } = useParams()
  const navigate = useNavigate()
  const list = useLoaderData() as MockimonList

  useEffect(() => {
    if (!mockiId) {
      navigate(`/mockidex/${list[0].id}`, { replace: true })
    }
  }, [mockiId, navigate, list])

  return (
    <>
      <MockimonSearch list={list} />
      <Outlet />
    </>
  )
}

const MockimonSearch = ({ list }: { list: MockimonList }) => {
  const mockiId = useParams().mockiId ?? "mockachu"
  const navigate = useNavigate()
  const currentMockimon = list.find((mockimon) => mockimon.id === mockiId)
  if (!currentMockimon) {
    return null
  }

  const nextMockimon = list.find((m) => m.number === currentMockimon.number + 1)
  const prevMockimon = list.find((m) => m.number === currentMockimon.number - 1)
  return (
    <div className="mockimon-search">
      <div id="change-mockimon-prev">
        {prevMockimon ? (
          <Link className="change-mockimon prev" to={prevMockimon.id}>
            <Icon children="<" />
            <span className="mockimon-name">
              <span style={{ color: "#ddd" }}>
                #{prevMockimon.number.toString().padStart(2, "0")}
              </span>{" "}
              {prevMockimon.name}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <Select
        options={list.map((mockimon) => ({
          value: mockimon.id,
          label: <>{mockimon.name}</>,
        }))}
        onChange={(mockimonId) => {
          mockimonId && navigate(mockimonId.value)
        }}
        value={{
          value: mockiId,
          label: (
            <h1 className="mockimon-name">
              {currentMockimon.name}{" "}
              <span>#{currentMockimon.number.toString().padStart(2, "0")}</span>
            </h1>
          ),
        }}
        placeholder={"Search for a Mockimon"}
        className="mockimon-search-select"
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            height: 40,
            borderRadius: 0,
            boxShadow: "none",
            color: "#ddd",
            "&:hover": {
              borderColor: "#ddd",
            },
            "&::before": {
              display: "block",
              content: '" "',
              position: "absolute",
              top: 0,
              border: "1px solid #fff",
              height: "100%",
              width: 44,
              backgroundColor: "#FFF",
              right: -24,
              transform: "skew(30deg, 0deg)",
              borderRadius: "0 8px 0 0",
              zIndex: 9,
            },
            "&::after": {
              display: "block",
              content: '" "',
              position: "absolute",
              top: 0,
              border: "1px solid #fff",
              height: "100%",
              width: 44,
              backgroundColor: "#FFF",
              left: -24,
              transform: "skew(-30deg, 0deg)",
              borderRadius: "8px 0 0 0",
              zIndex: 9,
            },
          }),
          indicatorsContainer: () => ({
            zIndex: 10,
          }),
          valueContainer: () => ({
            zIndex: 10,
            display: "flex",
            alignItems: "center",
          }),
        }}
      />
      <div id="change-mockimon-next">
        {nextMockimon ? (
          <Link className="change-mockimon next" to={nextMockimon.id}>
            <span className="mockimon-name">
              <span style={{ color: "#ddd" }}>
                #{nextMockimon.number.toString().padStart(2, "0")}
              </span>{" "}
              {nextMockimon.name}
            </span>
            <Icon children=">" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

const Icon = ({ children }: { children: string }) => (
  <span className="icon">{children}</span>
)
