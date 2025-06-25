import $api from "@/shared/api/api";
import StoreLikes from "@/shared/stores/StoreLikes";
import { serverPaths } from "@shared/PATHS";
import { Form } from "@t/gen/Users";
import { makeAutoObservable } from "mobx";

class StorePairs {
	pairs: Form[] | null = null;
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
    const liked = StoreLikes.liked;
		await $api.delete(`${serverPaths.rejectLike}/${id}`);
		if (liked) StoreLikes.liked = liked?.filter(e => e.id !== id);
    if (this.pairs) this.pairs = this.pairs.filter(e => e.id !== id)
	};
}

export default new StorePairs();
