import { MessageFormType } from "@t/gen/Schemas"
import { makeAutoObservable } from "mobx"

class StoreMessage {
  constructor() {
    makeAutoObservable(this)
  }

  lastMessages: MessageFormType[] | null = null

  initial = (data: MessageFormType[]) => {
    console.log(data)
    this.lastMessages = data
  }
}

export default new StoreMessage