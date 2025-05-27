import { Form } from "@t/gen/Users"
import { makeAutoObservable, runInAction } from "mobx"
import $api from "@/shared/api/api"
import { one, toCl } from "@shared/MAPPERS"
import { serverPaths } from "@shared/PATHS"

class StoreProfile {
  profile: Form | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = (data: Form) => {
    this.profile = data
  }

  async getProfile(id: number) {
    const request = one(toCl<Form[]>(await $api.get(`${serverPaths.forms}/${id}`)))
    runInAction(() => this.profile = request)
  }
}

export default new StoreProfile