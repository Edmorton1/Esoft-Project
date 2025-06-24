import { Form } from "@t/gen/Users"
import { makeAutoObservable } from "mobx"

class StorePairs {
  forms: Form[] = [];
  // cursor: number | null = null

  constructor () {
    makeAutoObservable(this)
  }

  initial = (data: Form[]) => {
    console.log({data})
    this.forms = data
  }
}

export default new StorePairs