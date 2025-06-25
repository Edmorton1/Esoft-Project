import { Request, Response } from "express";
import LikesValidation from "@s/infrastructure/endpoints/Likes/validation/Likes.validation";
import LikesModule from "@s/infrastructure/endpoints/Likes/sql/Likes.module";
import SharedValidation from "@s/infrastructure/middlewares/Shared.validation";
import { inject, injectable } from "inversify";
import LikesService from "@s/infrastructure/endpoints/Likes/services/LikesService";
import { Form } from "@t/gen/Users";
import logger from "@s/helpers/logger";
import BaseController from "@s/base/Base.controller";
import { serverPaths } from "@shared/PATHS";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import SharedMiddlewares from "@s/infrastructure/middlewares/SharedMiddlewares";

interface ILikesController {
	sendLike(req: Request, res: Response): Promise<void>;
	sendDelete(req: Request, res: Response): Promise<void>;
	likesGet(req: Request, res: Response): Promise<void>;
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
				func: this.sendLike,
			},
			{
				path: `${serverPaths.likesDelete}/:id`,
				method: "delete",
				middlewares: [AuthMiddleware.OnlyAuth, SharedMiddlewares.OnlyIdMiddleware],
				func: this.sendDelete,
			},
			{
				path: serverPaths.likesGet,
				method: "get",
				middlewares: [AuthMiddleware.OnlyAuth],
				func: this.likesGet,
			},
			{
				path: serverPaths.likesPairs,
				method: "get",
				middlewares: [AuthMiddleware.OnlyAuth],
				func: this.getPairs,
			},
			{
				path: `${serverPaths.rejectLike}/:liked_userid`,
				method: "delete",
				middlewares: [AuthMiddleware.OnlyAuth],
				func: this.rejectLike,
			},
		]);
	}

	sendLike = async (req: Request, res: Response) => {
		const likesDTO = LikesValidation.sendLike(req);

		const data = await this.likesService.sendLike(likesDTO);

		res.json(data);
	};

	sendDelete = async (req: Request, res: Response) => {
		const [id] = SharedValidation.OnlyId(req);
		const userid = req.session.userid!;

		const data = await this.likesService.sendDelete(id, userid);

		if (!data) {
			res.sendStatus(403);
			return;
		}

		res.json(data);
	};

	likesGet = async (req: Request, res: Response<Form[]>) => {
		const [lnglat, cursor] = LikesValidation.likesGet(req);
		// logger.info({lnglat, cursor})

		const response = await this.likesService.likesGet(
			req.session.userid!,
			lnglat,
			cursor,
		);

		res.json(response);
	};

	getPairs = async (req: Request, res: Response) => {
		const id = req.session.userid!;
		const data = await this.likesModule.getPairs(id);
		res.json(data);
	};

	rejectLike = async (req: Request, res: Response) => {
		const liked_userid = LikesValidation.rejectLike(req);
		const userid = req.session.userid!;

		logger.info({ userid, liked_userid });
		const data = await this.likesService.rejectLike(userid, liked_userid);
		logger.info({ ASDASDASD: data });

		if (!data) {
			res.sendStatus(404);
			return;
		}

		res.sendStatus(200);
	};
}

export default LikesController;
