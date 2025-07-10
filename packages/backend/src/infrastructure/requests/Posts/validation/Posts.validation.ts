import HttpContext from "@app/server/config/express/Http.context";
import logger from "@app/server/infrastructure/helpers/logger/logger";
import { PostsDTOPutServer, PostsDTOPutServerSchema, PostsDTOServer, PostsDTOServerSchema } from "@app/server/types/DTOServer";
import { serverPaths } from "@app/shared/PATHS";
import { zid } from "@app/types/shared/zodSnippets";

interface IPostsValidation {
	get: (ctx: HttpContext) => [number, number?];
	post: (ctx: HttpContext) => PostsDTOServer;
	put: (ctx: HttpContext) => [number, PostsDTOPutServer];
	delete: (ctx: HttpContext) => number;
}

class PostsValidation implements IPostsValidation {
	get: IPostsValidation["get"] = ctx => {
		logger.info({ZAPROS: `${serverPaths.postsGet}/${ctx.params.userid}?cursor=${ctx.query.cursor}`})
		const userid = zid.parse(ctx.params.userid);
		const cursor = zid.safeParse(ctx.query.cursor);
		const cursorParsed = cursor.success ? cursor.data : undefined
		
		return [userid, cursorParsed];
	};

	post: IPostsValidation["post"] = ctx => {
		// logger.info({ DATAT: ctx.body });
    const files = ctx.files;

		const postsDTO = JSON.parse(ctx.body.json);
		const userid = ctx.session.userid!;
		// logger.info({ ...postsDTO, userid });
		const parsed = PostsDTOServerSchema.parse({ ...postsDTO, files, userid });

		return parsed;
	};

	put: IPostsValidation["put"] = ctx => {
		const dto = JSON.parse(ctx.body.json);
		const files = ctx.files;
		const userid = ctx.session.userid;
    // logger.info({MASSIV: Array.isArray(files), FILES: files})

    // logger.info({PUT_DTO: { ...dto, files, userid }})

		const parsed = PostsDTOPutServerSchema.parse({ ...dto, files, userid });

    const post_id = zid.parse(ctx.params.post_id)

		return [post_id, parsed];
	};

	delete: IPostsValidation["delete"] = ctx => {
		const post_id = zid.parse(ctx.params.post_id);
		return post_id;
	};
}

export default new PostsValidation();
