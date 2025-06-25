import LikesValidation from "@s/infrastructure/endpoints/Likes/validation/Likes.validation";
import LikesModule from "@s/infrastructure/endpoints/Likes/sql/Likes.module";
import { inject, injectable } from "inversify";
import LikesService from "@s/infrastructure/endpoints/Likes/services/LikesService";
import { Form } from "@t/gen/Users";
import logger from "@s/helpers/logger";
import BaseController from "@s/config/base/Base.controller";
import { serverPaths } from "@shared/PATHS";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import HttpContext from "@s/infrastructure/express/Http.context";
import SharedMiddlewares from "@s/infrastructure/middlewares/SharedMiddlewares";

interface ILikesController {
	sendLike(ctx: HttpContext): Promise<void>;
	sendDelete(ctx: HttpContext): Promise<void>;
	likesGet(ctx: HttpContext): Promise<void>;
	getPairs(ctx: HttpContext): Promise<void>;
	rejectLike(ctx: HttpContext): Promise<void>;
}

@injectable()
class LikesController extends BaseController implements ILikesController {
	constructor(
		@inject(LikesModule)
		private readonly likesModule: LikesModule,
		@inject(LikesService)
		private readonly likesService: LikesService,
	) {
		super();

		this.bindRoutes([
			{
				path: `${serverPaths.likesSend}/:liked_userid`,
				method: "post",
				middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.sendLike,
			},
			{
				path: `${serverPaths.likesDelete}/:id`,
				method: "delete",
				middlewares: [
					AuthMiddleware.OnlyAuth,
					SharedMiddlewares.OnlyIdMiddleware,
				],
				handle: this.sendDelete,
			},
			{
				path: serverPaths.likesGet,
				method: "get",
				middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.likesGet,
			},
			{
				path: serverPaths.likesPairs,
				method: "get",
				middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.getPairs,
			},
			{
				path: `${serverPaths.rejectLike}/:liked_userid`,
				method: "delete",
				middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.rejectLike,
			},
		]);
	}

	sendLike: ILikesController['sendLike'] = async (ctx) => {
		const likesDTO = LikesValidation.sendLike(ctx);

		const data = await this.likesService.sendLike(likesDTO);

		ctx.json(data);
	};

	sendDelete: ILikesController['sendDelete'] = async (ctx: HttpContext) => {
		const userid = ctx.session.userid!;
		const id = ctx.par_id!

		const data = await this.likesService.sendDelete(id, userid);

		if (!data) {
			ctx.sendStatus(403);
			return;
		}

		ctx.json(data);
	};

	likesGet: ILikesController['likesGet'] = async (ctx: HttpContext<Form[]>) => {
		const [lnglat, cursor] = LikesValidation.likesGet(ctx);
		// logger.info({lnglat, cursor})

		const response = await this.likesService.likesGet(
			ctx.session.userid!,
			lnglat,
			cursor,
		);

		ctx.json(response);
	};

	getPairs = async (ctx: HttpContext) => {
		const id = ctx.session.userid!;
		const data = await this.likesModule.getPairs(id);
		ctx.json(data);
	};

	rejectLike = async (ctx: HttpContext) => {
		const liked_userid = LikesValidation.rejectLike(ctx);
		const userid = ctx.session.userid!;

		logger.info({ userid, liked_userid });
		const data = await this.likesService.rejectLike(userid, liked_userid);
		logger.info({ ASDASDASD: data });

		if (!data) {
			ctx.sendStatus(404);
			return;
		}

		ctx.sendStatus(200);
	};
}

export default LikesController;
