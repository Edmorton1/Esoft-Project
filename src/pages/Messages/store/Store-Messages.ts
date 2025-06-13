import $api from "@/shared/api/api"
import { makeAutoObservable, runInAction, toJS } from "mobx"
import { Form, Message } from "@t/gen/Users"
import { toCl, toJSON } from "@shared/MAPPERS"
import StoreUser from "@/shared/stores/Store-User"
import { serverPaths } from "@shared/PATHS"
import { toFormData } from "@/shared/funcs/filefuncs"
import { MessageDTOClient, MessagePutDTOClient, MessagePutDTOClientSchema } from "@t/client/DTOClient"

class StoreMessages {
  messages: Message[] | null = null
  form: Form | null = null
  cursor: number | null = null
  
  constructor() {
    makeAutoObservable(this)
  }

  get = async (data: {messages: Message[], form: Form}) => {
    if (this.messages !== null) {
      this.messages.unshift(...data.messages)
    } else {
      this.messages = data.messages
      this.form = data.form
    }
    console.log("THIS CURSOR NEW ", data.messages, this.cursor)
    this.cursor = data.messages[0]?.id
    
    console.log(this.messages, this.form)
    console.log(toJS(this.messages))    
  }

  send = async (data: MessageDTOClient) => {
    const formdata = data.files ? await toFormData(data.files) : new FormData
    console.log(data)

    formdata.append('json', toJSON(data))

    console.log(formdata.get('files'), formdata.get('json'))
    const request = await $api.post(serverPaths.sendMessage, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // storeSocket.socket.send(JSON.stringify(data))
  }

  put = async (raw: MessagePutDTOClient) => {
    const data = MessagePutDTOClientSchema.parse(raw)
    let fd;

    const old = this.messages!.find(e => e.id == data.id)!
    console.log(data, toJS(old), 'messagedto', data.deleted)

    // if (data.files.new == null && data.files.old.length === 0 && data.text == old.text) {
    //   return;
      
    // }
    // if (data.files.new == null && data.files.old.length === 0) {
      fd = new FormData
      fd.append('json', toJSON(data))
      // await $api.put(`${serverPaths.editMessage}/${data.id}`, fd)
    // } 
    // else {
      // data['deleted'] = old.files?.filter(e => !data.files.old?.includes(e)) ?? []
      data['deleted'] = old.files?.filter(e => !data.files.old?.includes(e)) ?? []
      console.log(data, toJS(old), 'messagedto')
      const newFiles = data.files.new!
      
      const cleanData = data as Partial<MessagePutDTOClient>
      delete cleanData.files
      
      fd = await toFormData(newFiles)
      fd.append('json', toJSON(cleanData))
    // }
    console.log(data)
    const request = await $api.put(`${serverPaths.editMessage}/${data.id}`, fd, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
  }

  delete = async (id: number) => {
    console.log(id)
    const request = await $api.delete(`${serverPaths.deleteMessage}/${id}`)
  }
  
  socketGet = (data: Message) => {
    // console.log(StoreUser.user.id, data.toid, data.fromid)
    if (data.toid === StoreUser.user!.id) {
      return this.messages!.push(data)
    }
    return this.messages!.push(data)
  }
  
  socketPut = (data: Message) => {
    console.log(data)
    this.messages! = this.messages!.map(e => e.id === data.id ? {...e, text: data.text, files: data.files} : e)
    this.messages! = this.messages!.map(e => e.id === data.id ? {...e, text: data.text, files: data.files} : e)
  }

  socketDelete = (id: number) => {
    this.messages! = this.messages!.filter(e => e.id != id)
    this.messages! = this.messages!.filter(e => e.id != id)
  }
}

export default new StoreMessages