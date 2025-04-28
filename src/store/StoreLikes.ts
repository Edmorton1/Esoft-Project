import $api from "@/store/api";
import StoreForm from "@/store/Store-Form";
import StoreGlobal from "@/store/Store-Global";
import { Likes } from "@s/core/domain/Users";
import { LikesDTO } from "@s/core/dtoObjects";
import { toCl } from "@s/infrastructure/db/Mappers";
import { makeAutoObservable, runInAction, toJS } from "mobx";

class StoreLikes {
  likes: {sent: {id: number, liked_userid: number}[]; received: {id: number, userid: number}[]} | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    console.log(StoreForm.form)
    const reqSent = toCl<Likes[]>(await $api.get(`/likes?userid=${StoreForm.form?.id}`))
    const reqRece = toCl<Likes[]>(await $api.get(`/likes?liked_userid=${StoreForm.form?.id}`))
    // console.log(toJS(sent, received))
    const sent = reqSent.flatMap(e => ({id: e.id, liked_userid: e.liked_userid}))
    const received = reqRece.flatMap(e => ({id: e.id, userid: e.userid}))
    runInAction(() => this.likes = {sent, received})
    console.log(toJS(this.likes))
  }

  delete = async (liked_userid: number) => {
    try {
      const id = this.likes?.sent.find(e => e.liked_userid == liked_userid)!.id
      console.log(id)
      const request = toCl(await $api.delete(`/likesDelete/${id}`))
      console.log(liked_userid, this.likes?.sent.filter(e => e.id != liked_userid))
      runInAction(() => this.likes!.sent = this.likes!.sent.filter(e => e.liked_userid != liked_userid))
      console.log(request)
    }
    catch(err) {
      console.log(err)
    }
  }

  sendDelete = async (id: number) => {
    const like = this.likes?.received.find(e => e.id == id)
    runInAction(() => this.likes?.received.filter(e => e.id != id))
    StoreGlobal.sendInfo(`Вы больше не нравитесь пользователю ${like!.userid}`)
  }

  sendLike = async (data: LikesDTO) => {
    const request: Likes = toCl(await $api.post('/likesGet', data))
    console.log(request)
    runInAction(() => this.likes?.sent.push(request))
    console.log(request)
  }

  socketGet = async (data: Likes) => {
    runInAction(() => this.likes?.received.push({id: data.id, userid: data.userid}))
    StoreGlobal.sendInfo(`Вы понравились пользователю ${data.userid}`, 'blue')
  }
}

export default new StoreLikes