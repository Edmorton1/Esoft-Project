import { lnglatType } from "@app/types/gen/types";
import { Form } from "@app/types/gen/Users";
import { makeAutoObservable } from "mobx";

type requestType = {
  forms: Form[],
  count: number
  geolocation: lnglatType
}

class StoreUsers {
  users: Form[] | null = null
  pagesCount: number | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  initial = (data: requestType) => {
    console.log(data)
    this.users = data.forms
    this.pagesCount = data.count
  }
}

export default new StoreUsers