import { makeAutoObservable } from "mobx"
import $api from "@/shared/api/api"
import { serverPaths } from "@shared/PATHS"

class StoreFiles {
  constructor() {
    makeAutoObservable(this)
  }

  async postAvatar(file: FormData, id: number): Promise<string> {
    const request: string = await $api.post(`${serverPaths.postAvatar}/${id}`, file)
    return request
  }
}

export default new StoreFiles