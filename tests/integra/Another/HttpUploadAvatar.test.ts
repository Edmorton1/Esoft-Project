import { toCl } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"
import $test from "@test/helpers/$test"
import { AVATAR_PATH, FRID, YANDEX_INCLUDE } from "@test/helpers/CONST"
import FormData from "form-data"
import fs from "fs"

async function uploadAvatar(): Promise<string> {
  const fd = new FormData
  fd.append('avatar', fs.createReadStream(AVATAR_PATH))

  const request = toCl<string>(await $test.post(`${serverPaths.postAvatar}/${FRID}`, fd))
  return request
}

describe('[UPLOAD AVATAR]: Тест загрузки аватара', () => {
  test.skip('Тест загрузки аватара', async () => {
    const url = await uploadAvatar()

    expect(url.includes(YANDEX_INCLUDE)).toStrictEqual(true)
  })
})