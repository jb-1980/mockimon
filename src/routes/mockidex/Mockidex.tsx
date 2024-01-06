import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import list from "../../../public/api/list.json"
import { useEffect } from "react"
import "./styles.css"
import Select from "react-select"

export const Mockidex = () => {
  const { mockiId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!mockiId) {
      navigate(`/mockidex/${list[0].id}`, { replace: true })
    }
  }, [mockiId, navigate])

  return (
    <div>
      <MockimonSearch />
      <Outlet />
    </div>
  )
}

const MockimonSearch = () => {
  const mockiId = useParams().mockiId ?? "mockachu"
  const navigate = useNavigate()
  const currentMockimon = list.find((mockimon) => mockimon.id === mockiId)
  if (!currentMockimon) {
    return null
  }
  const currentMockimonIndex = currentMockimon.number - 1
  return (
    <div className="mockimon-search">
      <div>
        {currentMockimonIndex === 0 ? (
          <div className="change-mockimon prev" />
        ) : (
          <Link
            className="change-mockimon prev"
            to={list[currentMockimonIndex - 1].id}
          >
            Previous
          </Link>
        )}
      </div>
      <Select
        options={list.map((mockimon) => ({
          value: mockimon.id,
          label: mockimon.name,
        }))}
        onChange={(mockimonId) => {
          mockimonId && navigate(mockimonId.value)
        }}
        value={{ value: mockiId, label: currentMockimon.name }}
        placeholder={"Search for a Mockimon"}
        className="mockimon-search-select"
      />
      <div>
        {currentMockimonIndex === list.length - 1 ? (
          <div className="change-mockimon next" />
        ) : (
          <Link
            className="change-mockimon next"
            to={list[currentMockimonIndex + 1].id}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
