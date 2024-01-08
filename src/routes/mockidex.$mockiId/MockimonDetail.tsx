import { useLoaderData } from "react-router-dom"
import { ErrorPage } from "../../Error"
import { JsonBlock } from "../../global-components/JsonBlock"
import { typeColors } from "../../type-colors"

export const MockimonDetail = () => {
  const mockimon = useLoaderData() as MockimonQuery | undefined

  if (!mockimon) {
    return <ErrorPage error={new Error("No mockimon found")} />
  } else {
    return (
      <div className="mockimon-detail">
        {/* <NameAndNumber name={mockimon.name} number={mockimon.number} /> */}
        <div className="mockimon-detail-container">
          <MockimonDetailsCard mockimon={mockimon} />
          <MockimonAPIDetails mockimon={mockimon} />
        </div>
      </div>
    )
  }
}

const MockimonAPIDetails = ({ mockimon }: { mockimon: MockimonQuery }) => {
  return (
    <div className="mockimon-api-details-block">
      <div>
        <h4 style={{ margin: "0 0 4px" }}>Fetch Endpoint</h4>
        <a href={`/api/mockimon-detail/${mockimon.id}.json`}>
          {`${window.location.origin}/api/mockimon-detail/${mockimon.id}.json`}
        </a>
      </div>
      <div>
        <h4 style={{ margin: "0 0 4px" }}>JSON</h4>
        <JsonBlock json={mockimon} />
      </div>
    </div>
  )
}

const MockimonDetailsCard = ({ mockimon }: { mockimon: MockimonQuery }) => {
  return (
    <div className="mockimon-details-card">
      <Image src={`/sprite/${mockimon.id}.png`} />
      <Description description={mockimon.description} />
      <Types types={mockimon.types} />
      <Size height={mockimon.size.height} weight={mockimon.size.weight} />
    </div>
  )
}

const Size = ({ height, weight }: { height: number; weight: number }) => {
  return (
    <div className="mockimon-info-container mockimon-size">
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
  return <img className="mockimon-image" src={src} />
}

const TypeBadge = ({ name }: { name: keyof typeof typeColors }) => {
  return <div className={`mockimon-type-badge ${name}`}>{name}</div>
}

const Types = ({ types }: { types: MockimonType[] }) => {
  return (
    <div className="mockimon-info-container">
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
    <div className="mockimon-info-container" style={{ maxWidth: 300 }}>
      <h3>Description</h3>
      <div>{description.replace("\f", " ")}</div>
    </div>
  )
}
