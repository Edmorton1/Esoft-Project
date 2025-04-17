import $api from "@/store/api"
import { makeAutoObservable } from "mobx"
import { Message } from "@s/core/domain/Users"
import storeSocket from "@/store/store-socket"
import storeAuthorization from "@/store/store-authorization"
import { toCl } from "@s/infrastructure/db/Mappers"

class StoreMessages {
  messages: Message[] = []
  constructor() {
    makeAutoObservable(this)
  }

  getAllMessage = async () => {
    const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    console.log('do dela')
    await delay(1000)
    console.log('after')
    const data: Message[] = toCl(await $api.get(`/messages?toid=${storeAuthorization.user.id}`))
    console.log(data)
    this.messages = data
    // return data
  }

  sendMessage = async (data: Message) => {
    const request = await $api.post('/sendMessage', data)
    // storeSocket.socket.send(JSON.stringify(data))
    console.log(request)
  }
}

export default new StoreMessages()