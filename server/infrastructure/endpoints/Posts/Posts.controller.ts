import BaseController from "@s/config/base/Base.controller";
import PostsService from "@s/infrastructure/endpoints/Posts/services/Posts.service";
import PostsValidation from "@s/infrastructure/endpoints/Posts/validation/Posts.validation";
import HttpContext from "@s/config/express/Http.context";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import { serverPaths } from "@shared/PATHS";
import { inject, injectable } from "inversify";
import { IS_AUTHOR } from "@shared/HEADERS";
import { upload } from "@s/infrastructure/endpoints/multer";

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

		ctx.set("Access-Control-Expose-Headers", "is-author");
    ctx.set(IS_AUTHOR, userid === ctx.session.userid ? "true" : "false")
		
    ctx.json(total)
    // УСТАНОВИТЬ ЗАГОЛОВОК is_author
  };

  // ПОТОМУ ЗДЕСЬ ТОЖЕ ПОМЕНЯТЬ НА ФОРМ ДАТУ
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

    if (total === null) {
      ctx.sendStatus(403)
    }

    ctx.json(total)
  };

	delete: IPostsController["delete"] = async ctx => {
    const post_id = PostsValidation.delete(ctx)
    const total = await this.postsService.delete(post_id, ctx.session.userid!)

    if (total === null) {
      ctx.sendStatus(403)
      return;
    }
    ctx.json(total)
  };
}

export default PostsController