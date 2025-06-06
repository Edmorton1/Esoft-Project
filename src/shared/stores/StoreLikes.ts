import $api from "@/shared/api/api";
import StoreGlobal from "@/shared/api/Store-Global";
import { Likes } from "@t/gen/Users";
import { LikesDTO } from "@t/gen/dtoObjects";
import { toCl } from "@shared/MAPPERS";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import StoreUser from "@/shared/stores/Store-User";
import { serverPaths } from "@shared/PATHS";
import StoreForm from "@/shared/stores/Store-Form";
import { FormWithDistanse } from "@t/gen/types";

class StoreLikes {
  likes: {sent: {id: number, liked_userid: number}[]; received: {id: number, userid: number}[]} | null = null
  liked: FormWithDistanse[] | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    // console.log(StoreForm.form)
    const sent = toCl<Likes[]>(await $api.get(`${serverPaths.likes}?userid=${StoreUser.user!.id}&fields=id, liked_userid`))
    const received = toCl<Likes[]>(await $api.get(`${serverPaths.likes}?liked_userid=${StoreUser.user!.id}&fields=id, userid`))
    runInAction(() => this.likes = {sent, received})
    // console.log('[SNET]', await $api.get(`${serverPaths.likes}?userid=${StoreUser.user!.id}&fields=id, liked_userid`))
    // console.log(toJS(this.likes))
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

  likedUser = async (data: FormWithDistanse[]) => {
    // const forms = toCl(await $api.get(`${serverPaths.likesGet}/2?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}`))
    this.liked = data
    console.log(toJS(data))
  }

  sendDelete = async (id: number) => {
    const like = this.likes?.received.find(e => e.id == id)
    runInAction(() => this.likes?.received.filter(e => e.id != id))
    StoreGlobal.sendInfo(`Вы больше не нравитесь пользователю ${like!.userid}`)
  }

  sendLike = async (data: LikesDTO) => {
    const request: Likes = toCl(await $api.post(`${serverPaths.likesSend}?fields=id, liked_userid`, data))
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