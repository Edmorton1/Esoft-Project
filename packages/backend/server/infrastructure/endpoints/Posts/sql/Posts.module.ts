// import ORM from "@app/server/infrastructure/db/SQL/ORM";
// import { POSTS_LIMIT } from "@app/shared/CONST";
// import { PostsDTO } from "@app/types/gen/dtoObjects";
// import { Posts } from "@app/types/gen/Users";
// import { inject, injectable } from "inversify";

// interface IPostsModule {
// 	get: (userid: number, cursor: number | undefined) => Promise<Posts[]>;
// 	post: (postsDTO: PostsDTO) => Promise<Posts[]>;
// 	put: () => void;
// 	delete: () => void;
// }

// @injectable()
// class PostsModule {
// 	constructor(
// 		@inject(ORM)
// 		private readonly ORM: ORM,
// 	) {}

// 	get: IPostsModule["get"] = async (userid, cursor) => {

// 	};

// 	post: IPostsModule["post"] = async (postsDTO) => {
    
//   };

// 	put: IPostsModule["put"] = () => {};

// 	delete: IPostsModule["delete"] = () => {};
// }

// export default PostsModule;
