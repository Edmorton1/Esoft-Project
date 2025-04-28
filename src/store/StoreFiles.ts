import { makeAutoObservable } from "mobx"
import $api from "./api"

class StoreFiles {
  constructor() {
    makeAutoObservable(this)
  }

  async postAvatar(file: FormData, id: number) {
    const request = await $api.post(`/postAvatar/${id}`, file)
  }
}

export default new StoreFiles