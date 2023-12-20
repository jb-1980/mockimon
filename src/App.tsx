import { MockimonDetail } from "./MockimonDetail"
import { useFetch } from "./useFetch"
import Modal from "react-modal"
import { ErrorPage } from "./Error"
import { Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MockimonList />}>
        <Route path=":mockiId" element={<MockiModal />} />
      </Route>
    </Routes>
  )
}

const MockimonList = () => {
  const navigate = useNavigate()
  const {
    data: mockimon,
    error,
    status,
  } = useFetch<MockimonList>("/api/list.json")
  if (status === "idle" || status === "pending") {
    return <p>Loading...</p>
  } else if (status === "rejected") {
    console.error({ error })
    return <ErrorPage error={error as Error} />
  }

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Pokemon Solid",
          fontWeight: 400,
          letterSpacing: 3,
          WebkitTextStrokeWidth: 2,
          WebkitTextStrokeColor: "#3B4CCA",
          color: "#FFDE00",
        }}
      >
        Mockímon
      </h1>
      <div className="mockimon-container">
        {mockimon.map((mocki) => (
          <MockiCard
            key={mocki.id}
            mocki={mocki}
            onClick={() => {
              navigate(mocki.id)
            }}
          />
        ))}
      </div>

      <Outlet />
    </div>
  )
}

const MockiCard = ({
  mocki,
  onClick,
}: {
  mocki: MockimonList[number]
  onClick: () => void
}) => {
  return (
    <button className="mocki-card" onClick={onClick}>
      <h2>{mocki.name}</h2>
      <img
        src={`/sprite/${mocki.id}.png`}
        style={{
          width: "300px",
          height: "300px",
        }}
      />
    </button>
  )
}

const MockiModal = () => {
  const navigate = useNavigate()
  const { mockiId } = useParams()
  return (
    <Modal
      isOpen
      onRequestClose={() => {
        navigate("..", { replace: true })
      }}
      contentLabel="Mocki Details"
      style={{
        content: {
          maxWidth: "800px",
          margin: "auto",
          inset: 0,
        },
      }}
    >
      <div style={{ position: "relative" }}>
        <button
          style={{
            position: "absolute",
            top: -16,
            right: -16,
            padding: 16,
            fontSize: 24,
            fontWeight: 600,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "var(--dark)",
          }}
          onClick={() => {
            navigate("..", { replace: true })
          }}
        >
          &times;
        </button>
        <MockimonDetail mockimonUrl={`/api/mockimon-detail/${mockiId}.json`} />
      </div>
    </Modal>
  )
}
