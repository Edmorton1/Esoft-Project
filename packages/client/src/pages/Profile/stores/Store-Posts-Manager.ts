import StorePosts from "@/pages/Profile/stores/Store-Posts";
import { makeAutoObservable } from "mobx";

class StorePostsManager {
	constructor() {
		makeAutoObservable(this);
	}

	users = new Map<number, StorePosts>();

	getOrCreateStore = (id: number) => {
		if (!this.users.has(id)) {
			this.users.set(id, new StorePosts(id));
		}
		return this.users.get(id)!;
	};
}

export default new StorePostsManager();
