import $api from "@/shared/api/api";
import StoreAlert from "@/shared/ui/Toast/Store-Alert";
import { Form, FormSchema, Likes } from "@t/gen/Users";
import { toCl } from "@shared/MAPPERS";
import { action, makeAutoObservable, makeObservable, observable, runInAction, toJS } from "mobx";
import StoreUser from "@/shared/stores/Store-User";
import { serverPaths } from "@shared/PATHS";
import { LikesDeleteSocketDTO, LikesSendSocketDTO } from "@t/gen/socketTypes";
import { z } from "zod";
import StoreBasePaginDoc from "@/shared/hooks/usePagination/doc/Store-Base-PaginDoc";
import StorePairs from "@/pages/Pairs/widgets/stores/Store-Pairs";

class StoreLikes extends StoreBasePaginDoc {
  likes: {sent: {id: number, liked_userid: number}[]; received: {id: number, userid: number}[]} | null = null;
  liked: Form[] = [];

  constructor() {
    super()
    makeObservable(this, {
      likes: observable,
      liked: observable,
      initial: action,
      lazyLoadLiked: action,
      like: action,
      rejectUser: action,
      delete: action,
      sockerRejectGet: action,
      socketGetDelete: action,
      socketGetLike: action,
    })
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
    const parsed = z.array(FormSchema).parse(data)
    console.log(parsed)
    // const forms = toCl(await $api.get(`${serverPaths.likesGet}/2?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}`))
    // this.liked = data
    // console.log(toJS(data))
    const ids_liked = this.liked.map(e => e.id)
    parsed.forEach(e => {
      if (!ids_liked.includes(e.id)) this.liked.push(e)
    })

        
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
        runInAction(() => this.liked = filtred)
        StorePairs.unshinft(form)
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
        StorePairs.removeById(form.id)
        runInAction(() => this.liked?.unshift(form))
      }
      
    }
    catch(err) {
      console.log(err)
    }
  }

  socketGetDelete = async (data: LikesDeleteSocketDTO) => {
    const {userid, name} = data
    
    const like = this.likes?.received.find(e => e.userid == userid)
    // console.log("УДАЛЁННЫЙ ЛАЙК", toJS(this.likes), userid, like)

    const received = this.likes?.received.filter(e => e.userid != userid)
    if (received) runInAction(() => this.likes!.received = received)
    
    runInAction(() => this.liked = this.liked.filter(e => e.id !== userid))

    StorePairs.removeById(userid)

    StoreAlert.likeInfo(userid, `Вы больше не нравитесь пользователю ${name}`)
    console.log({ВСЕ_ЛАЙКИ: toJS(this.likes), ЛАЙКЕД: toJS(this.liked), ПАРЫ: toJS(StorePairs.pairs)})
  }

  socketGetLike = async (data: LikesSendSocketDTO) => {
    const {like, form} = data
    runInAction(() => this.likes?.received.push(like))
    // console.log("ПОЛУЧЕН ЮЗЕР", form)
    if (this.likes?.sent.some(e => e.liked_userid === like.userid)) {
      StorePairs.unshinft(form)
    } else {
      this.liked.unshift(form)
    }
    // console.log("НАЙДЕНО В СЕНТ", this.likes.sent, like.userid)
    StoreAlert.likeInfo(like.userid, `Вы понравились пользователю ${form.name}`)
    console.log({ВСЕ_ЛАЙКИ: toJS(this.likes), ЛАЙКЕД: toJS(this.liked), ПАРЫ: toJS(StorePairs.pairs)})
  }
  
	rejectUser = async (id: number) => {
		// ID  ЭТО ЮЗЕРА
    const liked = this.liked;
		await $api.delete(`${serverPaths.rejectLike}/${id}`);
		runInAction(() => this.liked = liked?.filter(e => e.id !== id))

    StorePairs.removeById(id)
		
		if (this.likes?.received) {
			const filtredReceived = this.likes.received.filter(e => e.userid !== id)
			runInAction(() => this.likes!.received = filtredReceived)
		}
	};

	sockerRejectGet = (userid: number) => {
		if (this.likes) {
			const filtredLikes = this.likes.sent.filter(e => e.liked_userid !== userid)
			this.likes!.sent = filtredLikes
		}
	}
}

export default new StoreLikes