import $api from "@/store/api";
import { Form, Likes } from "@s/core/domain/Users";
import { LikesDTO } from "@s/core/dtoObjects";
import { makeAutoObservable, runInAction } from "mobx";

class StoreUsers {
  constructor() {
    makeAutoObservable(this)
  }
  
  users: Form[] | null = null

  initial = (data: Form[]) => {
    this.users = data
  }
}

export default new StoreUsers()