import { useState } from "react"
import { MockimonDetail } from "./MockimonDetail"
import { useFetch } from "./useFetch"
import Modal from "react-modal"

export const App = () => {
  const {
    data: mockimon,
    error,
    status,
  } = useFetch<MockimonList>("/mockimon/list.json")

  const [mocki, setMocki] = useState<string | null>(null)

  if (status === "idle" || status === "pending") {
    return <p>Loading...</p>
  } else if (status === "rejected") {
    console.error({ error })
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  } else if (status === "resolved") {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Mockimon</h1>
        <div className="mockimon-container">
          {mockimon.map((mocki) => (
            <MockiCard
              key={mocki.id}
              mocki={mocki}
              onClick={() => setMocki(mocki.id)}
            />
          ))}
        </div>

        {mocki && (
          <Modal
            isOpen
            onRequestClose={() => setMocki(null)}
            contentLabel="Mocki Details"
            style={{
              content: {
                minWidth: "80%",
                minHeight: "80%",
                margin: "auto",
              },
            }}
          >
            <MockimonDetail
              mockimonUrl={`/mockimon/mockimon-detail/${mocki}.json`}
            />
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
        src={`/mockimon/sprite/${mocki.id}.png`}
        style={{
          width: "300px",
          height: "300px",
        }}
      />
    </button>
  )
}
