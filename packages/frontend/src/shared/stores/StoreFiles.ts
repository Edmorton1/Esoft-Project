import { makeAutoObservable } from "mobx"
import $api from "@app/client/shared/api/api"
import { serverPaths } from "@app/shared/PATHS"
import StoreForm from "@app/client/shared/stores/Store-Form"
import { z } from "zod"

class StoreFiles {
  constructor() {
    makeAutoObservable(this)
  }

  async postAvatar(file: FormData): Promise<string> {
    const {data} = await $api.post(`${serverPaths.postAvatar}`, file)
    const parse = z.coerce.string().parse(data)

    console.log("AVATAR NEW URL", parse)
    StoreForm.setAvatar(parse)

    return parse
  }
}

export default new StoreFiles