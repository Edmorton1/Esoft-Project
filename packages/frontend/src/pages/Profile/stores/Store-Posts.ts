import { PostsDTOClient, PostsDTOPutClient } from "@app/client/pages/Profile/widgets/Posts/validation/Schemas";
import $api from "@app/client/shared/api/api";
import { toFormData } from "@app/client/shared/funcs/filefuncs";
import StoreBasePaginDoc from "@app/client/shared/hooks/usePagination/doc/Store-Base-PaginDoc";
import { IS_AUTHOR } from "@app/shared/HEADERS";
import { serverPaths } from "@app/shared/PATHS";
import { Posts, PostsSchema } from "@app/types/gen/Users";
import { AxiosResponse } from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { z } from "zod";

class StorePosts extends StoreBasePaginDoc {
	posts: Posts[] | null = null;
	canChange: boolean = false;

	constructor(
		readonly profileid: number
	) {
		super()
		makeObservable(this, {
			profileid: observable,
			posts: observable,
			canChange: observable,
			lazyLoadPosts: action,
			post: action,
			put: action,
			delete: action,
		});
	}

	lazyLoadPosts = (data: AxiosResponse<any, any>) => {
		// this.canChange = data.headers[IS_AUTHOR]

		console.log("HEADERS", data.headers[IS_AUTHOR] === "true");

		const parsed = z.array(PostsSchema).parse(data.data);
		console.log("POSTS", parsed);

		if (this.posts !== null) {
			this.posts.push(...parsed);
		} else {
			this.canChange = data.headers[IS_AUTHOR] === "true";
			this.posts = parsed;
		}
		// this.cursor = parsed[parsed.length - 1].id;
	};

	post = async (dataRaw: PostsDTOClient) => {
		const { files, ...dto } = dataRaw;

		const fd = toFormData(files);
		fd.append("json", JSON.stringify(dto));

		const { data } = await $api.post(`${serverPaths.postsPost}`, fd);
		console.log("NEW TOTAL", data);
		runInAction(() => this.posts?.unshift(data));
	};

	put = async (dataRaw: PostsDTOPutClient) => {
		const { files, ...dto } = dataRaw;
		console.log(files, dto);
		const fd = toFormData(files);
		fd.set("json", JSON.stringify(dto));

		const { data } = await $api.put(`${serverPaths.postsPut}/${dto.id}`, fd);
		const parsed = PostsSchema.parse(data);
		const filtred = this.posts?.map(e => (e.id === parsed.id ? parsed : e));
		if (filtred) runInAction(() => this.posts = filtred);
		console.log("TOTAL PUT", data);
	};

	delete = async (post_id: number) => {
		const filtred = this.posts?.filter(e => e.id !== post_id);
		if (filtred) runInAction(() => this.posts = filtred);

		const total = await $api.delete(`${serverPaths.postsDelete}/${post_id}`);
		console.log(total);
	};
}

export default StorePosts;
