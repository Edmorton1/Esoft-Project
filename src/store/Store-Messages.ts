import $api from "@/store/api"
import { makeAutoObservable } from "mobx"
import { Message } from "@s/core/domain/Users"
import storeSocket from "@/store/store-socket"
import storeAuthorization from "@/store/Store-User"
import { toCl } from "@s/infrastructure/db/Mappers"
import StoreUser from "@/store/Store-User"

class StoreMessages {
  messages: {sent: Message[]; received: Message[]} = undefined
  constructor() {
    makeAutoObservable(this)
  }

  getAllMessage = async () => {
    console.log('do dela')
    // await storeAuthorization.waitUser()
    console.log('after')
    console.log(storeAuthorization.user)
    const sent: Message[] = toCl(await $api.get(`/messages?fromid=${storeAuthorization.user.id}`))
    const received: Message[] = toCl(await $api.get(`/messages?toid=${storeAuthorization.user.id}`))
    const msgs = {sent, received}
    console.log(msgs)
    this.messages = msgs
  }

  sendMessage = async (data: Message) => {
    const request = await $api.post('/sendMessage', data)
    // storeSocket.socket.send(JSON.stringify(data))
    console.log(request)
  }
  
  takeMessage = async (data: Message) => {
    console.log(StoreUser.user.id, data.toid, data.fromid)
    if (data.toid == StoreUser.user.id) {
      return this.messages.received.push(data)
    }
    return this.messages.sent.push(data)
  }
}

export default new StoreMessages()