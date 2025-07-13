import StorePosts from "@app/client/pages/Profile/stores/Posts/Store-Posts";
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
