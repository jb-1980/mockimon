import { JsonBlock } from "./JsonBlock"
import { typeColors } from "./type-colors"
import { useFetch } from "./useFetch"

export const MockimonDetail = ({ mockimonUrl }: { mockimonUrl: string }) => {
  console.log({ mockimonUrl })
  const { data: mockimon, error, status } = useFetch<MockimonQuery>(mockimonUrl)

  if (status === "idle" || status === "pending") {
    return null
  } else if (status === "rejected") {
    console.error({ error })
    return (
      <div className="no-pokemon-container">
        <img src="/img/sad-pikachu.png" />
        <h2 style={{ color: "red" }}>Oops! Could not fetch the pokemon data</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  } else if (status === "resolved") {
    return (
      <div className="mockimon-detail-container">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <NameAndNumber name={mockimon.name} number={mockimon.number} />
          <Image src={`/mockimon/sprite/${mockimon.id}.png`} />
          <Description description={mockimon.description} />
          <Types types={mockimon.types} />
          <Size height={mockimon.size.height} weight={mockimon.size.weight} />
        </div>
        <div>
          <p>
            <h4>Fetch Endpoint</h4>
            <a href={`/mockimon/mockimon-detail/${mockimon.id}.json`}>
              {window.location.origin +
                `/mockimon/mockimon-detail/${mockimon.id}.json`}
            </a>
            <h4>JSON</h4>
            <JsonBlock json={mockimon} />
          </p>
        </div>
      </div>
    )
  }
}

const NameAndNumber = ({ name, number }: { name: string; number: number }) => {
  return (
    <h1 className="pokemon-name">
      {name} <span>#{number.toString().padStart(4, "0")}</span>
    </h1>
  )
}

const Size = ({ height, weight }: { height: number; weight: number }) => {
  return (
    <div className="pokemon-info-container pokemon-size">
      <h3>Size</h3>
      <div className="size-stat">
        <div className="label">Height:</div>
        <div className="description">
          <FeetText inches={height} />
        </div>
      </div>
      <div className="size-stat">
        <div className="label">Weight:</div>
        <div className="description">{weight} lbs.</div>
      </div>
    </div>
  )
}

const FeetText = ({ inches }: { inches: number }) => {
  const feet = Math.floor(inches / 12)
  const remainingInches = inches % 12
  return (
    <>
      {feet}'{remainingInches}"
    </>
  )
}

const Image = ({ src }: { src: string | undefined }) => {
  return <img className="pokemon-image" src={src} />
}

const TypeBadge = ({ name }: { name: keyof typeof typeColors }) => {
  return (
    <div
      className="pokemon-type-badge"
      style={{ background: typeColors[name] }}
    >
      {name}
    </div>
  )
}

const Types = ({ types }: { types: MockimonType[] }) => {
  return (
    <div className="pokemon-info-container">
      <h3>Type</h3>
      <div style={{ display: "flex", gap: 4, flexDirection: "row" }}>
        {types.map((type) => {
          return <TypeBadge key={type} name={type} />
        })}
      </div>
    </div>
  )
}

const Description = ({ description }: { description: string }) => {
  return (
    <div className="pokemon-info-container" style={{ maxWidth: 300 }}>
      <h3>Description</h3>
      <div>{description.replace("\f", " ")}</div>
    </div>
  )
}
