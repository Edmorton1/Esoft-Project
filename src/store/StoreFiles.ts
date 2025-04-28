import { makeAutoObservable } from "mobx"
import $api from "./api"

class StoreFiles {
  constructor() {
    makeAutoObservable(this)
  }

  async postAvatar(file: FormData, id: number): Promise<string> {
    const request: string = await $api.post(`/postAvatar/${id}`, file)
    return request
  }
}

export default new StoreFiles