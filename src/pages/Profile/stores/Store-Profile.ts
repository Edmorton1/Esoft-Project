import { Form } from "@t/gen/Users"
import { makeAutoObservable } from "mobx"

class StoreProfile {
  profile: Form | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = (data: Form) => {
    this.profile = data
  }
}

export default new StoreProfile