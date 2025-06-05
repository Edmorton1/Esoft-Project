import { FormWithDistanse, lnglatType } from "@t/gen/types";
import { Form } from "@t/gen/Users";
import { makeAutoObservable } from "mobx";

type requestType = {
  forms: FormWithDistanse[],
  count: number
  geolocation: lnglatType
}

class StoreUsers {
  users: FormWithDistanse[] | null = null
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