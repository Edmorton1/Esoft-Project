import {Request, Response} from "express";
import bcrypt from "bcrypt";
import ORM from "@s/infrastructure/db/SQL/ORM";
import logger from "@s/helpers/logger";
import {SALT} from "@shared/CONST";
import SharedService from "@s/infrastructure/services/SharedService";
import SettingsValidation from "@s/infrastructure/endpoints/Settings/validation/Settings.validation";
import { z } from "zod";
import FileService from "@s/infrastructure/services/FileService";
import SettingsService from "@s/infrastructure/endpoints/Settings/services/Settings.service";
import { inject, injectable } from "inversify";

@injectable()
class SettingsController {
  constructor (
    @inject(SettingsService)
    private readonly SettingsService: SettingsService
  ) {}
	passwordCompare = async (req: Request, res: Response) => {
		const [oldPass, newPass] = SettingsValidation.password(req);
		const id = req.session.userid!;

		const bdPass = (await ORM.getById(id, "users", "password"))[0].password;
		logger.info({bdPass});
		const rightPass = await bcrypt.compare(oldPass, bdPass);
		logger.info({password: rightPass});
		if (rightPass) {
			const passwordHash = await bcrypt.hash(newPass, SALT);
			await ORM.put({password: passwordHash}, id, "users", "password");
			return res.sendStatus(200);
		}
		res.sendStatus(400);
	};

	profilePut = async (req: Request, res: Response) => {
		const profile = SettingsValidation.profile(req);
		const {tags, location, ...data} = profile;
		const id = req.session.userid!;

		logger.info({prof: profile});
		const newLocation = location && SharedService.parseLocation(location);

		const payload = newLocation ? {...data, location: newLocation} : data;

		//@ts-ignore
		const [newProfile] = await ORM.put(payload, id, "forms");
		const newTags = await SharedService.uploadTags(id, tags, true);
		res.json({...newProfile, tags: newTags});
	};

	postAvatar = async (req: Request, res: Response) => {
		const id = z.coerce.number().parse(req.session.userid);
		const buffer = req.file!.buffer;
		const compress = await FileService.imageCompress(buffer);

		logger.info(compress.length);

		const location = this.SettingsService.postAvatar(id, compress)

		res.json(location);
	};
}

export default SettingsController;
