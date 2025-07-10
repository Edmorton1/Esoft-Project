import BaseController from "@app/server/config/base/Base.controller";
import PostsService from "@app/server/infrastructure/requests/Posts/services/Posts.service";
import PostsValidation from "@app/server/infrastructure/requests/Posts/validation/Posts.validation";
import HttpContext from "@app/server/config/express/Http.context";
import AuthMiddleware from "@app/server/infrastructure/requests/shared/middlewares/AuthMiddleware";
import { serverPaths } from "@app/shared/PATHS";
import { inject, injectable } from "inversify";
import { upload } from "@app/server/infrastructure/requests/shared/multer";
// import { HttpError } from "@app/shared/CONST";
// import TYPES from "@app/server/config/containers/types";
// import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";

interface IPostsController {
	get: (ctx: HttpContext) => Promise<void>;
	post: (ctx: HttpContext) => Promise<void>;
	put: (ctx: HttpContext) => Promise<void>;
	delete: (ctx: HttpContext) => Promise<void>;
}

@injectable()
class PostsController extends BaseController implements IPostsController {
	constructor(
    @inject(PostsService)
		private readonly postsService: PostsService,
		// @inject(TYPES.LoggerController)
		// private readonly logger: ILogger
	) {
		super();

		this.bindRoutes([
			{
				path: `${serverPaths.postsGet}/:userid`,
				method: "get",
				// middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.get,
			},
			{
				path: `${serverPaths.postsPost}`,
				method: "post",
				middlewares: [upload.array('files'), AuthMiddleware.OnlyAuth],
				handle: this.post,
			},
			{
				path: `${serverPaths.postsPut}/:post_id`,
				method: "put",
				middlewares: [upload.array('files'), AuthMiddleware.OnlyAuth],
				handle: this.put,
			},
			{
				path: `${serverPaths.postsDelete}/:post_id`,
				method: "delete",
				middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.delete,
			},
		]);
	}

	get: IPostsController["get"] = async ctx => {
    const [userid, cursor] = PostsValidation.get(ctx)

    const total = await this.postsService.get(userid, cursor)

		// ctx.set("Access-Control-Expose-Headers", "is-author");
    // ctx.set(IS_AUTHOR, userid === ctx.session.userid ? "true" : "false")
		
    ctx.json(total)
  };

	post: IPostsController["post"] = async ctx => {
		const postsDTO = PostsValidation.post(ctx)
		// logger.info(postsDTO)
		const total = await this.postsService.post(postsDTO)
		ctx.json(total)
  };

	put: IPostsController["put"] = async ctx => {
    const [id, postsDTO] = PostsValidation.put(ctx)
    // logger.info(postsDTO)
    
    const total = await this.postsService.put(id, postsDTO)

    // if (total === null) {
    //   ctx.sendStatus(403)
    // }

    ctx.json(total)
  };

	delete: IPostsController["delete"] = async ctx => {
    const post_id = PostsValidation.delete(ctx)
    const total = await this.postsService.delete(post_id, ctx.session.userid!)
    ctx.json(total)
  };
}

export default PostsController