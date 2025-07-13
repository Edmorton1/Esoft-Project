import StorePosts from "@app/client/pages/Profile/stores/Posts/Store-Posts";
import { Posts } from "@app/types/gen/Users";
import { runInAction } from "mobx";

class StorePostsLogic {
	constructor(private readonly StorePosts: StorePosts) {}

	post = async (data: any) => {
		console.log("NEW TOTAL", data);
		runInAction(() => this.StorePosts.posts?.unshift(data));
	};

	changePosts = (filtred: Posts[]) => {
		if (filtred) runInAction(() => (this.StorePosts.posts = filtred));
	};
}

export default StorePostsLogic;
