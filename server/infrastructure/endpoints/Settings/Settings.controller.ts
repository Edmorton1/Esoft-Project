import { Request, Response } from "express";
import logger from "@s/helpers/logger";
import SettingsValidation from "@s/infrastructure/endpoints/Settings/validation/Settings.validation";
import { z } from "zod";
import FileService from "@s/infrastructure/services/FileService";
import SettingsService from "@s/infrastructure/endpoints/Settings/services/Settings.service";
import { inject, injectable } from "inversify";

@injectable()
class SettingsController {
	constructor(
		@inject(SettingsService)
		private readonly SettingsService: SettingsService,
	) {}

	passwordCompare = async (req: Request, res: Response) => {
		const [oldPass, newPass] = SettingsValidation.password(req);
		const id = req.session.userid!;

		const data = await this.SettingsService.passwordCompare(id, oldPass, newPass)

		if (!data) {
			res.sendStatus(400)
			return;
		}

		res.sendStatus(200)

	};

	profilePut = async (req: Request, res: Response) => {
		const profile = SettingsValidation.profile(req);
		const id = req.session.userid!;

		const request = await this.SettingsService.profilePut(id, profile)

		res.json(request);
	};

	postAvatar = async (req: Request, res: Response) => {
		const id = z.coerce.number().parse(req.session.userid);
		const buffer = req.file!.buffer;

		const location = this.SettingsService.postAvatar(id, buffer);

		res.json(location);
	};
}

export default SettingsController;
