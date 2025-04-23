import $api from "@/store/api";
import { Form, Likes } from "@s/core/domain/Users";
import { LikesDTO } from "@s/core/dtoObjects";
import { configure, makeAutoObservable, runInAction } from "mobx";

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