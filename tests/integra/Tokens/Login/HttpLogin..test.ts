import { responseInterface as LoginResponse } from "@/shared/stores/Store-User"
import { toCl } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import $test from "@test/helpers/$test"

const body = {
  email: "lexabig@gmail.com a",
  password: "123123"
}

async function login(data: any) {
  try {
    const request = toCl<LoginResponse>(await $test.post(`${serverPaths.login}`, data))
    console.log(request)
    return request
  } catch (err) {
    console.log(err)
  }

}

describe('[LOGIN]: Тест логинизации', () => {
  test('Логинизация верная', async () => {
    const request = await login(body) as LoginResponse
    const {accessToken, user} = request

    expect(typeof accessToken).toStrictEqual('string')
    expect(typeof user.id).toStrictEqual("number")
    expect(typeof user.created_at).toStrictEqual("string")
    expect(user.email).toStrictEqual(body.email)
    expect(typeof user.password).toStrictEqual("string")
    expect(user.role).toStrictEqual("user")
  })
})