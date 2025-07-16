import { lnglatType } from "@app/types/gen/types";
import { Form } from "@app/types/gen/Users";
import { makeAutoObservable, toJS } from "mobx";

type requestType = {
  forms: Form[],
  count: number
  geolocation: lnglatType
}

// {page: number, form: Form[]}

class StoreUsers {
  users: Form[] = []
  pagesCount: number | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  initial = (data: requestType) => {
    console.log(data)
    if (this.users.length) {
      this.users.push(...data.forms)
    }
    this.users = data.forms
    this.pagesCount = data.count

    console.log("users", toJS(this.users))
  }
}

export default new StoreUsers