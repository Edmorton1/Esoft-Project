import { Form } from "@s/core/domain/Users"
import { makeAutoObservable, runInAction } from "mobx"
import $api from "@/shared/api/api"
import { one, toCl } from "@shared/MAPPERS"

class StoreProfile {
  profile: Form | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = (data: Form) => {
    this.profile = data
  }

  async getProfile(id: number) {
    const request = one(toCl<Form[]>(await $api.get(`/forms/${id}`)))
    runInAction(() => this.profile = request)
  }
}

export default new StoreProfile