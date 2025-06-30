import {
	PostsDTOClient,
	PostsDTOPutClient,
} from "@/pages/Profile/Posts/validation/Schemas";
import $api from "@/shared/api/api";
import { toFormData } from "@/shared/funcs/filefuncs";
import { IS_AUTHOR } from "@shared/HEADERS";
import { serverPaths } from "@shared/PATHS";
import { Posts, PostsSchema } from "@t/gen/Users";
import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { z } from "zod";

class StorePosts {
	posts: Posts[] | null = null;
	canChange: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	lazyLoadPosts = (data: AxiosResponse<any, any>) => {
		// this.canChange = data.headers[IS_AUTHOR]
		console.log("HEADERS", data.headers["is-author"] === "true");

		const parsed = z.array(PostsSchema).parse(data.data);
		console.log("POSTS", parsed);

		if (this.posts !== null) {
			this.posts.push(...parsed);
		} else {
			this.canChange = data.headers["is-author"] === "true";
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
		this.posts?.unshift(data);
	};

	put = async (dataRaw: PostsDTOPutClient) => {
		const { files, ...dto } = dataRaw;
    console.log(files, dto)
    const fd = toFormData(files)
    fd.set("json", JSON.stringify(dto))

    const {data} = await $api.put(`${serverPaths.postsPut}/${dto.id}`, fd)
    const parsed = PostsSchema.parse(data)
    const filtred = this.posts?.map(e => e.id === parsed.id ? parsed : e)
    if (filtred) this.posts = filtred
    console.log("TOTAL PUT",data)
	};

	delete = async (post_id: number) => {
		const filtred = this.posts?.filter(e => e.id !== post_id);
		if (filtred) this.posts = filtred;

		const total = await $api.delete(`${serverPaths.postsDelete}/${post_id}`);
		console.log(total);
	};
}

export default new StorePosts();
