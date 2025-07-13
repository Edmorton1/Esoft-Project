import $api from "@app/client/shared/api/api";
import { Form, FormSchema, LikesSchema } from "@app/types/gen/Users";
import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import StoreUser from "@app/client/shared/stores/Store-User";
import { serverPaths } from "@app/shared/PATHS";
import { LikesDeleteSocketDTO, LikesSendSocketDTO } from "@app/types/gen/socketTypes";
import { z } from "zod";
import StoreBasePaginDoc from "@app/client/shared/hooks/usePagination/doc/Store-Base-PaginDoc";
import BroadCast from "@app/client/shared/stores/BroadCast";
import LikesLogic from "@app/client/shared/stores/Likes/StoreLikes.logic";

class StoreLikes extends StoreBasePaginDoc {
	likes: {
		sent: { id: number; liked_userid: number }[];
		received: { id: number; userid: number }[];
	} | null = null;
	liked: Form[] = [];

	private channel: BroadCast<"like" | "delete" | "socketGetDelete" | "socketGetLike" | "rejectUser" | "socketRejectGet"> =
		new BroadCast("store-likes");
	private logic = new LikesLogic();

	constructor() {
		super();
		makeObservable(this, {
			likes: observable,
			liked: observable,
			initial: action,
			lazyLoadLiked: action,
			like: action,
			rejectUser: action,
			delete: action,
			socketRejectGet: action,
			socketGetDelete: action,
			socketGetLike: action,
		});

		this.channel.register({
			like: this.logic.like,
			delete: this.logic.delete,
			socketGetDelete: this.logic.socketGetDelete,
			socketGetLike: this.logic.socketGetLike,
			rejectUser: this.logic.rejectUser,
			socketRejectGet: this.logic.socketRejectGet
		});
	}

	initial = async () => {
		// console.log(StoreForm.form)
		const sent = z
			.array(LikesSchema)
			.parse((await $api.get(`${serverPaths.likes}?userid=${StoreUser.user!.id}`)).data);
		const received = z
			.array(LikesSchema)
			.parse((await $api.get(`${serverPaths.likes}?liked_userid=${StoreUser.user!.id}`)).data);

		runInAction(() => (this.likes = { sent, received }));
		// console.log('[SNET]', await $api.get(`${serverPaths.likes}?userid=${StoreUser.user!.id}&fields=id, liked_userid`))
		// console.log(toJS(this.likes))
	};

	lazyLoadLiked = (data: Form[]) => {
		const parsed = z.array(FormSchema).parse(data);
		console.log(parsed);
		// const forms = toCl(await $api.get(`${serverPaths.likesGet}/2?lat=${StoreForm.form?.location?.lat}&lng=${StoreForm.form?.location?.lng}`))
		// this.liked = data
		// console.log(toJS(data))
		const ids_liked = this.liked.map(e => e.id);
		parsed.forEach(e => {
			if (!ids_liked.includes(e.id)) this.liked.push(e);
		});

		// console.log(this.liked, this.liked)
		console.log(toJS(this.liked));
	};

	like = async (form: Form) => {
		const request = LikesSchema.parse(
			(await $api.post(`${serverPaths.likesSend}/${form.id}`)).data,
		);

		console.log(request);
		this.logic.like(form, request);

		console.log("[CHANNEL] ПЕРЕД ПЕРЕДАЧЕЙ", [toJS(form), request]);
		this.channel.startFunction("like", [form, request]);
	};

	delete = async (form: Form) => {
		const id = this.likes?.sent.find(e => e.liked_userid == form.id)!.id;

		console.log(id);
		await $api.delete(`${serverPaths.likesDelete}/${id}`);

		this.logic.delete(form, id);

		this.channel.startFunction("delete", [form, id]);
	};

	socketGetDelete = (data: LikesDeleteSocketDTO) => {
		this.logic.socketGetDelete(data);
		this.channel.startFunction("socketGetDelete", [data]);
	};

	socketGetLike = (data: LikesSendSocketDTO) => {
		this.logic.socketGetLike(data)
		this.channel.startFunction("socketGetLike", [data])
	};

	rejectUser = async (id: number) => {
		// ID  ЭТО ЮЗЕРА
		await $api.delete(`${serverPaths.rejectLike}/${id}`);
		this.logic.rejectUser(id)
		this.channel.startFunction("rejectUser", [id])
	};

	socketRejectGet = (userid: number) => {
		this.logic.socketRejectGet(userid)
		this.channel.startFunction("socketRejectGet", [userid])
	};
}

export default new StoreLikes();
