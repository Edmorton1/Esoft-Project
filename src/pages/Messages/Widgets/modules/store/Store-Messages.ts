import $api from "@/shared/api/api"
import { makeAutoObservable, runInAction, toJS } from "mobx"
import { Message } from "@s/core/domain/Users"
import { toCl } from "@shared/MAPPERS"
import StoreUser from "@/shared/stores/Store-User"
import { MessageDTO, MessagePutDTO } from "@s/core/dtoObjects"
import { serverPaths } from "@shared/PATHS"
import { toFormData } from "@/shared/funcs/filefuncs"

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
    //@ts-ignore
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

  put = async (data: MessagePutDTO) => {
    const old = this.messages!.sent.find(e => e.id == data.id)!
    console.log(data, toJS(old))
    if (data.files.new == null && data.files.old == null && data.text == old.text) {
      return;
      
    }
    if (data.files.new == null && data.files.old == null) {
      await $api.put(`${serverPaths.editMessage}/${data.id}`, data)

    } else {
      const deleted = old.files?.filter(e => data.files.old?.includes(e))
      const formdata = await toFormData(data.files.new)
      // Object.entries(data).forEach(e => formdata.append(e[0], String(e[1])))
  
      formdata.append('fromid', String(data.fromid))
      formdata.append('toid', String(data.toid))
      formdata.append('text', data.text)
      deleted?.forEach(e => {
        formdata.append('deleted[]', e.split('.net/')[1])
      })
  
      // console.log(formdata.get('id'))
  
      const request = await $api.put(`${serverPaths.editMessage}/${data.id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
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
    console.log(data)
    this.messages!.received = this.messages!.received.map(e => e.id === data.id ? {...e, text: data.text, files: data.files} : e)
    this.messages!.sent = this.messages!.sent.map(e => e.id === data.id ? {...e, text: data.text, files: data.files} : e)
  }

  socketDelete = (id: number) => {
    this.messages!.received = this.messages!.received.filter(e => e.id != id)
    this.messages!.sent = this.messages!.sent.filter(e => e.id != id)
  }
}

export default new StoreMessages