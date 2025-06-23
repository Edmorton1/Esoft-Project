import $api from "@/shared/api/api";
import StoreGlobal from "@/shared/api/Store-Global";
import { Likes } from "@t/gen/Users";
import { toCl } from "@shared/MAPPERS";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import StoreUser from "@/shared/stores/Store-User";
import { serverPaths } from "@shared/PATHS";
import { FormWithDistanse } from "@t/gen/types";

class StoreLikes {
  likes: {sent: {id: number, liked_userid: number}[]; received: {id: number, userid: number}[]} | null = null;
  liked: FormWithDistanse[] | null = null;
  cursor: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  initial = async () => {
    // console.log(StoreForm.form)
    const sent = toCl<Likes[]>(await $api.get(`${serverPaths.likes}?userid=${StoreUser.user!.id}`))
    const received = toCl<Likes[]>(await $api.get(`${serverPaths.likes}?liked_userid=${StoreUser.user!.id}`))
    runInAction(() => this.likes = {sent, received})
    // console.log('[SNET]', await $api.get(`${serverPaths.likes}?userid=${StoreUser.user!.id}&fields=id, liked_userid`))
    // console.log(toJS(this.likes))
  }

  likedUser = async (data: FormWithDistanse[]) => {
    // const forms = toCl(await $api.get(`${serverPaths.likesGet}/2?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}`))
    // this.liked = data
    // console.log(toJS(data))
    if (this.liked !== null) {
      this.liked.push(...data)
    } else {
      this.liked = data
    }
    
    console.log("THIS CURSOR NEW ", data, this.cursor)
    this.cursor = data[data.length - 1]?.id
        
    // console.log(this.liked, this.liked)
    console.log(toJS(this.liked))
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

  sendLike = async (liked_userid: number) => {
    const request: Likes = toCl(await $api.post(`${serverPaths.likesSend}/${liked_userid}`))
    console.log(request)
    runInAction(() => this.likes?.sent.push(request))
    console.log('Like agredd', request)
  }

  socketGet = async (data: Likes) => {
    runInAction(() => this.likes?.received.push({id: data.id, userid: data.userid}))
    StoreGlobal.sendInfo(`Вы понравились пользователю ${data.userid}`, 'blue')
  }
}

export default new StoreLikes