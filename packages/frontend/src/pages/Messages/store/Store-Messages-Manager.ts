import StoreMessages from "@app/client/pages/Messages/store/Store-Messages"
import { makeAutoObservable } from "mobx"

class StoreMessagesManager {
  constructor () {
    makeAutoObservable(this)
  }
  chats = new Map<number, StoreMessages>()

  getOrCreateStore = (toid: number) => {
    if (!this.chats.has(toid)) {
      this.chats.set(toid, new StoreMessages(toid))
    }
    return this.chats.get(toid)!
  }
}

export default new StoreMessagesManager