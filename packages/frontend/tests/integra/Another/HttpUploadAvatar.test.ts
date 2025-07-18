
import { serverPaths } from "@app/shared/PATHS"
import FormData from "form-data"
import fs from "fs"
import $test from "packages/frontend/tests/helpers/$test"
import { AVATAR_PATH, FRID, YANDEX_INCLUDE } from "packages/frontend/tests/helpers/CONST"

async function uploadAvatar(): Promise<string> {
  const fd = new FormData
  fd.append('avatar', fs.createReadStream(AVATAR_PATH))

  const request = (await $test.post(`${serverPaths.postAvatar}/${FRID}`, fd)).data
  return request
}

describe('[UPLOAD AVATAR]: Тест загрузки аватара', () => {
  test('Тест загрузки аватара', async () => {
    const url = await uploadAvatar()

    expect(url.includes(YANDEX_INCLUDE)).toStrictEqual(true)
  })
})