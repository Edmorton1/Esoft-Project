import $api from "@/store/api"
import { makeAutoObservable } from "mobx"
import { Message } from "@s/core/domain/Users"
import StoreSocket from "@/store/Store-Socket"
import storeAuthorization from "@/store/Store-User"
import { toCl } from "@s/infrastructure/db/Mappers"
import StoreUser from "@/store/Store-User"

class StoreMessages {
  messages: {sent: Message[]; received: Message[]} = undefined
  constructor() {
    makeAutoObservable(this)
  }

  getAll = async () => {
    // console.log('do dela')
    // await storeAuthorization.waitUser()
    // console.log('after')
    // console.log(storeAuthorization.user)
    const sent: Message[] = toCl(await $api.get(`/messages?fromid=${storeAuthorization.user?.id}`))
    const received: Message[] = toCl(await $api.get(`/messages?toid=${storeAuthorization.user?.id}`))
    const msgs = {sent, received}
    // console.log(msgs)
    this.messages = msgs
  }

  send = async (data: Message) => {
    const request = await $api.post('/sendMessage', data)
    // storeSocket.socket.send(JSON.stringify(data))
    console.log(request)
  }

  put = async (data: Message) => {
    console.log(data)
    const request = await $api.put(`/editMessage/${data.id}`, data)
  }

  delete = async (id: number) => {
    const request = await $api.delete(`/deleteMessage/${id}`)
  }
  
  socketGet = (data: Message) => {
    console.log(StoreUser.user.id, data.toid, data.fromid)
    if (data.toid == StoreUser.user.id) {
      return this.messages.received.push(data)
    }
    return this.messages.sent.push(data)
  }
  
  socketPut = (data: Message) => {
    this.messages.received = this.messages.received
  }

  socketDelete = (id: number) => {
    console.log(id)
    this.messages.received = this.messages.received.filter(e => e.id != id)
    this.messages.sent = this.messages.sent.filter(e => e.id != id)
  }
}

export default new StoreMessages()