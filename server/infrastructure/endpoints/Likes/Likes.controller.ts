import { Request, Response } from "express";
import LikesValidation from "@s/infrastructure/endpoints/Likes/validation/Likes.validation";
import LikesModule from "@s/infrastructure/endpoints/Likes/sql/Likes.module";
import SharedValidation from "@s/infrastructure/middlewares/Shared.validation";
import { inject, injectable } from "inversify";
import LikesService from "@s/infrastructure/endpoints/Likes/services/LikesService";
import { Form } from "@t/gen/Users";
import logger from "@s/helpers/logger";
import HttpContext from "@s/infrastructure/express/Http.context";
import { z } from "zod";

interface ILikesController {
	sendLike(ctx: HttpContext): Promise<void>;
	sendDelete(ctx: HttpContext): Promise<void>;
	likesGet(ctx: HttpContext): Promise<void>;
	getPairs(ctx: HttpContext): Promise<void>;
	rejectLike(ctx: HttpContext): Promise<void>
}

@injectable()
class LikesController implements ILikesController {
	constructor(
		@inject(LikesModule)
		private readonly likesModule: LikesModule,
		@inject(LikesService)
		private readonly likesService: LikesService,
		@inject(LikesValidation)
		private readonly likesValidation: LikesValidation
	) {}

	sendLike: ILikesController["sendLike"] = async ctx => {
		const likesDTO = this.likesValidation.sendLike(ctx);

		const data = await this.likesService.sendLike(likesDTO);

		ctx.json(data);
	};

	sendDelete: ILikesController["sendDelete"] = async (ctx) => {
		//@ts-ignore ПОТОМ ВЕРНУТЬ
		// const [id] = SharedValidation.OnlyId(ctx);
		const id = z.coerce.number().parse(ctx.params.id)
		const userid = ctx.session.userid!;

		const data = await this.likesService.sendDelete(id, userid);

		if (!data) {
			ctx.sendStatus(403);
			return;
		}

		ctx.json(data);
	};

	likesGet: ILikesController["likesGet"] = async (ctx) => {
		const [lnglat, cursor] = this.likesValidation.likesGet(ctx);
		// logger.info({lnglat, cursor})

		const response = await this.likesService.likesGet(
			ctx.session.userid!,
			lnglat,
			cursor,
		);

		ctx.json(response);
	};

	getPairs: ILikesController['getPairs'] = async (ctx) => {
		const id = ctx.session.userid!;
		const data = await this.likesModule.getPairs(id);
		ctx.json(data);
	};

	rejectLike: ILikesController['rejectLike'] = async (ctx) => {
		const liked_userid = this.likesValidation.rejectLike(ctx);
		const userid = ctx.session.userid!;

		logger.info({ userid, liked_userid });
		const data = await this.likesService.rejectLike(userid, liked_userid);
		logger.info({ TAIDADA: data });

		if (!data) {
			ctx.sendStatus(404);
			return;
		}

		ctx.sendStatus(200);
	};
}

export default LikesController;
