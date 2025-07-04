import { MessageFormType } from "@app/types/gen/Schemas"
import { makeAutoObservable, runInAction } from "mobx"

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