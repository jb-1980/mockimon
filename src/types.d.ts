type MockimonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy"
  | "light"

type MockimonQuery = {
  id: string
  number: number
  name: string
  image: string
  description: string
  types: MockimonType[]
  size: {
    weight: number
    height: number
  }
  mockimon_url: string
}

type MockimonList = {
  id: string
  name: string
  number: number
}[]
