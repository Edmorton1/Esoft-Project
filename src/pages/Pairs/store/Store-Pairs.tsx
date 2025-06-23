import { Form } from "@t/gen/Users"
import { makeAutoObservable } from "mobx"

class StorePairs {
  forms: Form[] = [];
  cursor: number | null = null

  constructor () {
    makeAutoObservable(this)
  }

  initial = (data: Form[]) => {
    this.forms = data
    this.cursor = data
  }
}

export default StorePairs