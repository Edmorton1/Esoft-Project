import $api from "@/store/api";
import StoreForm from "@/store/Store-Form";
import { Likes } from "@s/core/domain/Users";
import { LikesDTO } from "@s/core/dtoObjects";
import { toCl } from "@s/infrastructure/db/Mappers";
import { makeAutoObservable, runInAction, toJS } from "mobx";

class StoreLikes {
  constructor() {
    makeAutoObservable(this)
  }

  // likes: {sent: number[]; received: number[]} | null = null
  likes: {sent: {id: number, liked_userid: number}[]; received: {id: number, userid: number}[]} | null = null

  initial = async () => {
    const reqSent = toCl<Likes[]>(await $api.get(`/likes?userid=${StoreForm.form?.id}`))
    const reqRece = toCl<Likes[]>(await $api.get(`/likes?liked_userid=${StoreForm.form?.id}`))
    // console.log(toJS(sent, received))
    const sent = reqSent.flatMap(e => ({id: e.id, liked_userid: e.liked_userid}))
    const received = reqRece.flatMap(e => ({id: e.id, userid: e.userid}))
    this.likes = {sent, received}
  }

  sendLike = async (data: LikesDTO) => {
    const request = toCl(await $api.post('/likesGet', data))
    this.likes?.sent.push()
    console.log(request)
  }

  socketGet = async (data: Likes) => {
    this.likes?.received.push({id: data.id, userid: data.userid})
  }
}

export default new StoreLikes()