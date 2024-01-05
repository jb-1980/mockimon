import { beforeAll, describe, expect, test } from "vitest"
import list from "../public/api/list.json"
import fs from "fs"

describe("mockimon", () => {
  const mockimonList: Record<string, MockimonQuery> = {}
  let sprites: string[] = []
  beforeAll(async () => {
    // eslint-disable-next-line
    const mockimonFiles = fs.readdirSync("./public/api/mockimon-detail")
    for (const mockimon of mockimonFiles) {
      await import(`../public/api/mockimon-detail/${mockimon}`).then(
        (data: { default: MockimonQuery }) => {
          // eslint-disable-next-line
          mockimonList[mockimon.replace(".json", "")] = data.default
        }
      )
    }
    // eslint-disable-next-line
    sprites = fs.readdirSync("./public/sprite")
  })
  test("mockimon numbers should be sequential", () => {
    list.forEach((item, i) => {
      expect(item.number).toBe(i + 1)
    })
  })
  test("mockimon names should be unique", () => {
    const names = list.map((item) => item.name)
    const uniqueNames = new Set(names)
    expect(names.length).toBe(uniqueNames.size)
  })
  test("mockimon ids should be lowercase of name", () => {
    list.forEach((item) => {
      expect(item.id).toBe(item.name.toLowerCase())
    })
  })

  test("all mockimon in list should have a mockimon json file", () => {
    list.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!mockimonList[item.id]) console.log(item.id)
      expect(mockimonList[item.id]).toBeDefined()
    })
  })

  test("all mockimon in mockimon json file should be in list, and have correct shape", () => {
    for (const [id, mockimonData] of Object.entries(mockimonList)) {
      const mockimon = list.find((mockimon) => mockimon.id === id)
      // helpful to see which mockimon are mis-numbered
      if (mockimon?.number !== mockimonData.number) console.log(id)
      expect(mockimon).toBeDefined()
      expect(mockimon?.number).toBe(mockimonData.number)
      expect(mockimon?.name).toBe(mockimonData.name)
      expect(mockimonData.image).toMatch(
        `https://mockimon.github.io/sprite/${id}.png`
      )
      expect(mockimonData.mockimon_url).toMatch(
        `https://mockimon.github.io/#/${id}`
      )
      expect(mockimonData).toMatchObject({
        /* eslint-disable */
        id: expect.any(String),
        number: expect.any(Number),
        name: expect.any(String),
        image: expect.any(String),
        description: expect.any(String),
        types: expect.any(Array),
        size: {
          weight: expect.any(Number),
          height: expect.any(Number),
        },
        mockimon_url: expect.any(String),
        /* eslint-enable */
      })
    }
  })

  test("all mockimon in sprite folder should be in list", () => {
    sprites.forEach((sprite) => {
      const id = sprite.replace(".png", "")
      const mockimon = list.find((mockimon) => mockimon.id === id)
      expect(mockimon).toBeDefined()
    })
  })

  test("all mockimon in list should have a sprite", () => {
    list.forEach((item) => {
      const sprite = sprites.find((sprite) => sprite === `${item.id}.png`)
      // helpful to see which mockimon are missing sprites
      if (!sprite) console.log(item.id)
      expect(sprite).toBeDefined()
    })
  })
})
