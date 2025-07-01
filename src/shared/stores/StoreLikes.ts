import $api from "@/shared/api/api";
import StoreAlert from "@/shared/api/Store-Alert";
import { Form, Likes } from "@t/gen/Users";
import { toCl } from "@shared/MAPPERS";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import StoreUser from "@/shared/stores/Store-User";
import { serverPaths } from "@shared/PATHS";
import StorePairs from "@/shared/stores/Store-Pairs";
import { LikesDeleteSocketDTO, LikesSendSocketDTO } from "@t/gen/socketTypes";

class StoreLikes {
  likes: {sent: {id: number, liked_userid: number}[]; received: {id: number, userid: number}[]} | null = null;
  liked: Form[] | null = null;

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

  lazyLoadLiked = async (data: Form[]) => {
    console.log(data)
    // const forms = toCl(await $api.get(`${serverPaths.likesGet}/2?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}`))
    // this.liked = data
    // console.log(toJS(data))
    if (this.liked !== null) {
      this.liked.push(...data)
    } else {
      this.liked = data
    }
        
    // console.log(this.liked, this.liked)
    console.log(toJS(this.liked))
  }

  like = async (form: Form) => {
    const request: Likes = toCl(await $api.post(`${serverPaths.likesSend}/${form.id}`))
    console.log(request)
    runInAction(() => this.likes?.sent.push(request))
    console.log('Like agredd', request)

    const liked_ids = this.liked?.map(e => e.id)
		if (liked_ids?.includes(form.id)) {
      const filtred = this.liked?.filter(e => e.id !== form.id)
      if (filtred) {
        this.liked = filtred
        if (StorePairs.pairs) StorePairs.pairs.unshift(form)
      }
    };
  }

  delete = async (form: Form) => {
    try {
      const id = this.likes?.sent.find(e => e.liked_userid == form.id)!.id
      console.log(id)
      const request = toCl(await $api.delete(`${serverPaths.likesDelete}/${id}`))
      console.log(form.id, this.likes?.sent.filter(e => e.id != form.id))
      runInAction(() => this.likes!.sent = this.likes!.sent.filter(e => e.liked_userid != form.id))
      console.log(request)

      const pairs_ids = StorePairs.pairs?.map(e => e.id)
      if (pairs_ids?.includes(form.id)) {
        StorePairs.pairs = StorePairs.pairs!.filter(e => e.id !== form.id)
        if (this.liked) this.liked?.push(form)
      }
      
    }
    catch(err) {
      console.log(err)
    }
  }

  socketGetDelete = async (data: LikesDeleteSocketDTO) => {
    const {userid, name} = data
    const like = toJS(this.likes?.received.find(e => e.userid == userid))
    console.log("УДАЛЁННЫЙ ЛАЙК", toJS(this.likes), userid, like)

    const received = this.likes?.received.filter(e => e.userid != userid)
    if (received) this.likes!.received = received

    StoreAlert.likeInfo(userid, `Вы больше не нравитесь пользователю ${name}`)
  }

  socketGetLike = async (data: LikesSendSocketDTO) => {
    const {name, ...like} = data
    runInAction(() => this.likes?.received.push(like))
    StoreAlert.likeInfo(like.userid, `Вы понравились пользователю ${name}`)
  }
}

export default new StoreLikes