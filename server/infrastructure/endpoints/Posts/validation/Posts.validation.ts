import HttpContext from "@s/config/express/Http.context";
import logger from "@s/helpers/logger/logger";
import { PostsDTO, PostsDTOPut, PostsDTOPutSchema, PostsDTOSchema } from "@t/gen/dtoObjects";
import { zid } from "@t/shared/zodSnippets";
import { z } from "zod";

interface IPostsValidation {
	get: (ctx: HttpContext) => [number, number?];
	post: (ctx: HttpContext) => PostsDTO;
	put: (ctx: HttpContext) => [number, PostsDTOPut];
	delete: (ctx: HttpContext) => number;
}

class PostsValidation implements IPostsValidation {
	get: IPostsValidation["get"] = ctx => {
		const userid = zid.parse(ctx.params.userid);
		const cursor = zid.optional().parse(ctx.query.cursor);
		return [userid, cursor];
	};

	post: IPostsValidation["post"] = ctx => {
		// logger.info({ DATAT: ctx.body });
    const files = ctx.files;

		const postsDTO = JSON.parse(ctx.body.json);
		const userid = ctx.session.userid!;
		// logger.info({ ...postsDTO, userid });
		const parsed = PostsDTOSchema.parse({ ...postsDTO, files, userid });

		return parsed;
	};

	put: IPostsValidation["put"] = ctx => {
		const dto = JSON.parse(ctx.body.json);
		const files = ctx.files;
		const userid = ctx.session.userid;
    // logger.info({MASSIV: Array.isArray(files), FILES: files})

    // logger.info({PUT_DTO: { ...dto, files, userid }})

		const parsed = PostsDTOPutSchema.parse({ ...dto, files, userid });

    const post_id = zid.parse(ctx.params.post_id)

		return [post_id, parsed];
	};

	delete: IPostsValidation["delete"] = ctx => {
		const post_id = zid.parse(ctx.params.post_id);
		return post_id;
	};
}

export default new PostsValidation();
