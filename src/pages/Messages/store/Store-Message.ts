import { makeAutoObservable } from "mobx"

class StoreMessage {
  constructor() {
    makeAutoObservable(this)
  }

  // lastMessages = 
}

export default new StoreMessage