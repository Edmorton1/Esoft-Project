import $api from "@/store/api"
import { makeAutoObservable, runInAction } from "mobx"
import { Message } from "@s/core/domain/Users"
import StoreSocket from "@/store/Store-Socket"
import { toCl } from "@s/infrastructure/db/Mappers"
import StoreUser from "@/store/Store-User"
import { toFormData } from "@/modules/funcDropAva"
import { MessageDTO } from "@s/core/dtoObjects"
import { serverPaths } from "@shared/PATHS"

interface MessagePut {
  fromid: number,
  toid: number,
  text: string,
  files: {new: FileList | null, old: string[]},
}

class StoreMessages {
  messages: {sent: Message[]; received: Message[]} | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    const sent = toCl<Message[]>(await $api.get(`/messages?fromid=${StoreUser.user?.id}`))?.sort((a, b) => a.id! - b.id!)
    const received = toCl<Message[]>(await $api.get(`/messages?toid=${StoreUser.user?.id}`))?.sort((a, b) => a.id! - b.id!)
    const msgs = {sent, received}
    runInAction(() => this.messages = msgs)
  }

  send = async (data: MessageDTO) => {
    const formdata = await toFormData(data.files)
    console.log(data)
    formdata.append('fromid', String(data.fromid))
    formdata.append('toid', String(data.toid))
    formdata.append('text', data.text)

    console.log(formdata.get('files'))
    const request = await $api.post('/sendMessage', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // storeSocket.socket.send(JSON.stringify(data))
  }

  put = async (data: MessagePut) => {
    const old = this.messages?.sent.find(e => e.toid == data.toid)
    const deleted = old?.files.filter(e => !data.files.old.includes(e))
    const formdata = await toFormData(data.files.new!)
    console.log(deleted)
    // const request = await $api.put(`${serverPaths.editMessage}/${data.id}`, data)
  }

  delete = async (id: number) => {
    console.log(id)
    const request = await $api.delete(`${serverPaths.deleteMessage}/${id}`)
  }
  
  socketGet = (data: Message) => {
    // console.log(StoreUser.user.id, data.toid, data.fromid)
    if (data.toid === StoreUser.user!.id) {
      return this.messages!.received.push(data)
    }
    return this.messages!.sent.push(data)
  }
  
  socketPut = (data: Message) => {
    this.messages!.received = this.messages!.received.map(e => e.id === data.id ? {...e, text: data.text} : e)
    this.messages!.sent = this.messages!.sent.map(e => e.id === data.id ? {...e, text: data.text} : e)
  }

  socketDelete = (id: number) => {
    this.messages!.received = this.messages!.received.filter(e => e.id != id)
    this.messages!.sent = this.messages!.sent.filter(e => e.id != id)
  }
}

export default new StoreMessages