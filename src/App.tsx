import { useState } from "react"
import { MockimonDetail } from "./MockimonDetail"
import { useFetch } from "./useFetch"
import Modal from "react-modal"
import { ErrorPage } from "./Error"

export const App = () => {
  const { data: mockimon, error, status } = useFetch<MockimonList>("/list.json")

  const [mocki, setMocki] = useState<string | null>(null)

  if (status === "idle" || status === "pending") {
    return <p>Loading...</p>
  } else if (status === "rejected") {
    console.error({ error })
    return <ErrorPage error={error as Error} />
  } else {
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
                setMocki(mocki.id)
              }}
            />
          ))}
        </div>

        {mocki && (
          <Modal
            isOpen
            onRequestClose={() => {
              setMocki(null)
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
                  setMocki(null)
                }}
              >
                &times;
              </button>
              <MockimonDetail
                mockimonUrl={`/api/mockimon-detail/${mocki}.json`}
              />
            </div>
          </Modal>
        )}
      </div>
    )
  }
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
