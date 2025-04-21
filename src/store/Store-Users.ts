import $api from "@/store/api";
import { Form } from "@s/core/domain/Users";
import { makeAutoObservable, runInAction } from "mobx";

class StoreUsers {
  constructor() {
    makeAutoObservable(this)
  }
  
  users: Form[] | null = null

  initial = (data: Form[]) => {
    runInAction(() => this.users = data)
  }
}

export default new StoreUsers()