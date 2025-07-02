import $api from "@/shared/api/api";
import StoreLikes from "@/shared/stores/StoreLikes";
import { serverPaths } from "@shared/PATHS";
import { Form } from "@t/gen/Users";
import { makeAutoObservable } from "mobx";

class StorePairs {
	pairs: Form[] = [];
	// cursor: number | null = null

	constructor() {
		makeAutoObservable(this);
	}

	initial = async () => {
		const { data } = await $api.get(serverPaths.likesPairs);

		console.log({ data });

		this.pairs = data;
	};

	rejectUser = async (id: number) => {
		// ID  ЭТО ЮЗЕРА
    const liked = StoreLikes.liked;
		await $api.delete(`${serverPaths.rejectLike}/${id}`);
		StoreLikes.liked = liked?.filter(e => e.id !== id);
    this.pairs = this.pairs.filter(e => e.id !== id)

		
		if (StoreLikes.likes?.received) {
			const filtredReceived = StoreLikes.likes.received.filter(e => e.userid !== id)
			StoreLikes.likes.received = filtredReceived
		}
	};

	sockerRejectGet = (userid: number) => {
		if (StoreLikes.likes) {
			const filtredLikes = StoreLikes.likes.sent.filter(e => e.liked_userid !== userid)
			StoreLikes.likes.sent = filtredLikes
		}
	}
}

export default new StorePairs();
