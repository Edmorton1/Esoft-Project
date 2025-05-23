import { Form } from "@t/gen/Users";
import { makeAutoObservable } from "mobx";

class StoreUsers {
  users: Form[] | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  initial = (data: Form[]) => {
    this.users = data
  }
}

export default new StoreUsers