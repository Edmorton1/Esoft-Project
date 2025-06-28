import SettingsValidation from "@s/infrastructure/endpoints/Settings/validation/Settings.validation";
import { z } from "zod";
import SettingsService from "@s/infrastructure/endpoints/Settings/services/Settings.service";
import { inject, injectable } from "inversify";
import HttpContext from "@s/config/express/Http.context";
import BaseController from "@s/config/base/Base.controller";
import { serverPaths } from "@shared/PATHS";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import { upload } from "@s/infrastructure/endpoints/multer";

@injectable()
class SettingsController extends BaseController {
	constructor(
		@inject(SettingsService)
		private readonly SettingsService: SettingsService,
	) {
		super()
		this.bindRoutes([
			{
				path: serverPaths.passwordCompare,
				method: "post",
				middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.passwordCompare,
			},
			{
				path: serverPaths.profilePut,
				method: "put",
				middlewares: [AuthMiddleware.OnlyAuth],
				handle: this.profilePut,
			},
			{
				path: serverPaths.postAvatar,
				method: "post",
				middlewares: [upload.single("avatar"), AuthMiddleware.OnlyAuth],
				handle: this.postAvatar,
			},
		])
	}

	passwordCompare = async (ctx: HttpContext) => {
		const [oldPass, newPass] = SettingsValidation.password(ctx);
		const id = ctx.session.userid!;

		const data = await this.SettingsService.passwordCompare(id, oldPass, newPass)

		if (!data) {
			ctx.sendStatus(400)
			return;
		}

		ctx.sendStatus(200)

	};

	profilePut = async (ctx: HttpContext) => {
		const profile = SettingsValidation.profile(ctx);
		const id = ctx.session.userid!;

		const request = await this.SettingsService.profilePut(id, profile)

		ctx.json(request);
	};

	postAvatar = async (ctx: HttpContext) => {
		const id = z.coerce.number().parse(ctx.session.userid);
		const buffer = ctx.file!.buffer;

		const location = this.SettingsService.postAvatar(id, buffer);

		ctx.json(location);
	};
}

export default SettingsController;
