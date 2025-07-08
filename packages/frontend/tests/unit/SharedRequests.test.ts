import SharedRequests from "@app/client/shared/funcs/Shared-Requests"

describe("Тест SharedRequest.ts", () => {
  const coords = [[37.65851472600051, 56.977829957202744], [2.3517513068902773, 49.36840985435065]]
  const cityByCoords = SharedRequests.cityByCoords

  test("НОРМАЛЬНЫЙ ЗАПРОС", async () => {
    const total = await cityByCoords(coords[0])

    expect(typeof total.city).toStrictEqual("string")
    expect(typeof total.lng).toStrictEqual("number")
    expect(typeof total.lat).toStrictEqual("number")
  })
  test("ЗАПРОС С ОШИБКОЙ", async () => {
    const total = await cityByCoords(coords[1])

    expect(total.city).toStrictEqual("")
    expect(typeof total.lng).toStrictEqual("number")
    expect(typeof total.lat).toStrictEqual("number")
  })
})