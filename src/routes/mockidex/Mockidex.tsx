import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom"
import { useEffect } from "react"
import "./styles.css"
import Select, { OptionProps, SingleValueProps } from "react-select"

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

const SearchOption = (
  props: OptionProps<{ value: string; label: MockimonList[number] }>
) => {
  // console.log({ props, styles: props.getStyles("option", props) })
  const { data, isFocused, isSelected } = props
  const mockimon = data.label
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        backgroundColor: isFocused
          ? "var(--red)"
          : isSelected
          ? "var(--dark-red)"
          : "transparent",
        color: isSelected || isFocused ? "var(--light)" : "var(--dark)",
        fontWeight: 600,
      }}
      ref={props.innerRef}
      {...props.innerProps}
    >
      <img
        src={`/sprite/${mockimon.id}.png`}
        alt={mockimon.name}
        style={{
          width: 32,
          height: 32,
          marginRight: 8,
          borderRadius: 4,
          boxShadow: "0 0 0 1px #ddd",
        }}
      />
      {mockimon.name}
      <span
        style={{
          color: isSelected || isFocused ? "var(--light)" : "#888",
          marginLeft: "auto",
        }}
      >
        #{mockimon.number.toString().padStart(2, "0")}
      </span>
    </div>
  )
}

const MockimonName = (
  props: SingleValueProps<{ label: MockimonList[number]; value: string }>
) => {
  console.log({ props })
  const {
    data: { label: mockimon },
  } = props
  return (
    <h1
      className="search-name-value"
      style={{
        color: "var(--dark)",
        margin: 0,
      }}
    >
      {mockimon.name}{" "}
      <span style={{ color: "#888" }}>
        #{mockimon.number.toString().padStart(2, "0")}
      </span>
    </h1>
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
        components={{
          Option: SearchOption,
          SingleValue: MockimonName,
        }}
        options={list.map((mockimon) => ({
          value: mockimon.id,
          label: mockimon,
        }))}
        isMulti={false}
        onChange={(newValue) => {
          newValue && navigate(newValue.value)
        }}
        value={{
          value: mockiId,
          label: currentMockimon,
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
        classNames={{
          menu: (state) => {
            // const classNames = state.getClassNames("menu", state)
            console.log({ state })
            // return classNames
            return "mockimon-search-menu"
          },
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
