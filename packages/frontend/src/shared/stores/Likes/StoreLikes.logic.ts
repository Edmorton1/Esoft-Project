import StorePairs from "@app/client/pages/Pairs/widgets/stores/Store-Pairs";
import StoreLikes from "@app/client/shared/stores/Likes/StoreLikes";
import StoreAlert from "@app/client/shared/ui/Toast/Store-Alert";
import { LikesDeleteSocketDTO, LikesSendSocketDTO } from "@app/types/gen/socketTypes";
import { Form, Likes } from "@app/types/gen/Users";
import { runInAction, toJS } from "mobx";

class LikesLogic {
	like = (form: Form, request: Likes) => {
		runInAction(() => StoreLikes.likes?.sent.push(request));

		console.log("Like agredd", request);

		const liked_ids = StoreLikes.liked?.map(e => e.id);
		if (liked_ids?.includes(form.id)) {
			const filtred = StoreLikes.liked?.filter(e => e.id !== form.id);
			if (filtred) {
				runInAction(() => (StoreLikes.liked = filtred));
				StorePairs.unshift(form);
			}
		}
	};

	delete = (form: Form, id: number | undefined) => {
		console.log(id);
		console.log(
			form.id,
			StoreLikes.likes?.sent.filter(e => e.id != form.id),
		);
		runInAction(
			() =>
				(StoreLikes.likes!.sent = StoreLikes.likes!.sent.filter(e => e.liked_userid != form.id)),
		);
		// console.log(request)

		const pairs_ids = StorePairs.pairs?.map(e => e.id);
		if (pairs_ids?.includes(form.id)) {
			StorePairs.removeById(form.id);
			runInAction(() => StoreLikes.liked?.unshift(form));
		}
	};

	socketGetDelete = (data: LikesDeleteSocketDTO) => {
		const { userid, name } = data;

		// const like = this.likes?.received.find(e => e.userid == userid)
		// console.log("УДАЛЁННЫЙ ЛАЙК", toJS(this.likes), userid, like)

		const received = StoreLikes.likes?.received.filter(e => e.userid != userid);
		if (received) runInAction(() => (StoreLikes.likes!.received = received));

		runInAction(() => (StoreLikes.liked = StoreLikes.liked.filter(e => e.id !== userid)));

		StorePairs.removeById(userid);

		StoreAlert.likeInfo(userid, `Вы больше не нравитесь пользователю ${name}`);
		console.log({
			ВСЕ_ЛАЙКИ: toJS(StoreLikes.likes),
			ЛАЙКЕД: toJS(StoreLikes.liked),
			ПАРЫ: toJS(StorePairs.pairs),
		});
	};

	socketGetLike = (data: LikesSendSocketDTO) => {
		const { like, form } = data;
		runInAction(() => StoreLikes.likes?.received.push(like));
		// console.log("ПОЛУЧЕН ЮЗЕР", form)
		if (StoreLikes.likes?.sent.some(e => e.liked_userid === like.userid)) {
			StorePairs.unshift(form);
		} else {
			StoreLikes.liked.unshift(form);
		}
		// console.log("НАЙДЕНО В СЕНТ", this.likes.sent, like.userid)
		StoreAlert.likeInfo(like.userid, `Вы понравились пользователю ${form.name}`);
		console.log({
			ВСЕ_ЛАЙКИ: toJS(StoreLikes.likes),
			ЛАЙКЕД: toJS(StoreLikes.liked),
			ПАРЫ: toJS(StorePairs.pairs),
		});
	};

	rejectUser = (id: number) => {
		const liked = StoreLikes.liked;
		runInAction(() => (StoreLikes.liked = liked?.filter(e => e.id !== id)));

		StorePairs.removeById(id);

		if (StoreLikes.likes?.received) {
			const filtredReceived = StoreLikes.likes.received.filter(e => e.userid !== id);
			runInAction(() => (StoreLikes.likes!.received = filtredReceived));
		}
	};

	socketRejectGet = (userid: number) => {
		if (StoreLikes.likes) {
			const filtredLikes = StoreLikes.likes.sent.filter(e => e.liked_userid !== userid);
			StoreLikes.likes!.sent = filtredLikes;
		}
	};
}

export default LikesLogic;
