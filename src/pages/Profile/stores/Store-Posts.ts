import { IS_AUTHOR } from "@shared/HEADERS";
import { Posts, PostsSchema } from "@t/gen/Users";
import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { z } from "zod";

class StorePosts {
	posts: Posts[] | null = null;
	cursor: number | null = null;
	canChange: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	lazyLoadPosts = (data: AxiosResponse<any, any>) => {
		// this.canChange = data.headers[IS_AUTHOR]
		console.log("HEADERS", data.headers["is-author"] === "true");

		const parsed = z.array(PostsSchema).parse(data.data);
    console.log("POSTS", parsed)

    if (this.posts !== null) {
      this.posts.push(...parsed)
    } else {
      this.canChange = data.headers["is-author"] === "true";
      this.posts = parsed
    }
		this.cursor = parsed[parsed.length - 1].id;
	};
}

export default new StorePosts();
