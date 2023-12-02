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
}

type MockimonList = {
  id: string
  name: string
}[]
