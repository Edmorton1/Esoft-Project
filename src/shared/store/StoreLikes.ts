import $api from "@/shared/api/api";
import StoreForm from "@/shared/store/Store-Form";
import StoreGlobal from "@/shared/api/Store-Global";
import { Likes } from "@s/core/domain/Users";
import { LikesDTO } from "@s/core/dtoObjects";
import { toCl } from "@s/infrastructure/db/Mappers";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import StoreUser from "./Store-User";
import { serverPaths } from "@shared/PATHS";

class StoreLikes {
  likes: {sent: {id: number, liked_userid: number}[]; received: {id: number, userid: number}[]} | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    console.log(StoreForm.form)
    const sent = toCl<Likes[]>(await $api.get(`/likes?userid=${StoreUser.user!.id}&fields=id, liked_userid`))
    const received = toCl<Likes[]>(await $api.get(`/likes?liked_userid=${StoreUser.user!.id}&fields=id, userid`))
    runInAction(() => this.likes = {sent, received})
    console.log(toJS(this.likes))
  }

  delete = async (liked_userid: number) => {
    try {
      const id = this.likes?.sent.find(e => e.liked_userid == liked_userid)!.id
      console.log(id)
      const request = toCl(await $api.delete(`${serverPaths.likesDelete}/${id}`))
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
    const request: Likes = toCl(await $api.post(`${serverPaths.likesGet}?fields`, data))
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