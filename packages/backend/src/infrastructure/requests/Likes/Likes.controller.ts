import LikesValidation from "@app/server/infrastructure/requests/Likes/validation/Likes.validation";
import LikesModule from "@app/server/infrastructure/requests/Likes/sql/Likes.module";
import { inject, injectable } from "inversify";
import LikesService from "@app/server/infrastructure/requests/Likes/services/LikesService";
import { Form } from "@app/types/gen/Users";
import logger from "@app/server/infrastructure/helpers/logger/logger";
import BaseController from "@app/server/config/base/Base.controller";
import { serverPaths } from "@app/shared/PATHS";
import AuthMiddleware from "@app/server/infrastructure/requests/shared/middlewares/AuthMiddleware";
import HttpContext from "@app/server/config/express/Http.context";
import SharedValidate from "@app/server/infrastructure/requests/shared/middlewares/SharedValidate";

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
				middlewares: [AuthMiddleware.OnlyAuth],
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
		const id = SharedValidate.OnlyId(ctx)

		const data = await this.likesService.sendDelete(id, userid);

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
