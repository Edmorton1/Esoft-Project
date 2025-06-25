import logger from "@s/helpers/logger";
import Yandex from "@s/helpers/yandex";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";
import { inject, injectable } from "inversify";
import { SALT } from "@shared/CONST";
import bcrypt from "bcrypt";
import SharedService from "@s/infrastructure/services/SharedService";
import { ProfileSchema } from "@s/infrastructure/endpoints/Settings/validation/Settings.validation";
import { Form } from "@t/gen/Users";
import FileService from "@s/infrastructure/services/FileService";

interface SettingsServiceRepo {
  postAvatar: (id: number, buffer: Buffer<ArrayBufferLike>) => Promise<string | undefined>;
  passwordCompare: (id: number, oldPass: string, newPass: string) => Promise<boolean>;
  profilePut: (id: number, profile: ProfileSchema) => Promise<Form>
}

@injectable()
class SettingsService implements SettingsServiceRepo {
	constructor(
		@inject(Yandex)
		private readonly Yandex: Yandex,
		@inject(ORMCopy)
		private readonly ORM: ORMCopy,
		@inject(SharedService)
		private readonly sharedService: SharedService
	) {}

	passwordCompare: SettingsServiceRepo["passwordCompare"] = async (
		id,
		oldPass,
		newPass,
	) => {
		const bdPass = (await this.ORM.getById(id, "users", "password"))[0]
			.password;
		logger.info({ bdPass });
		const rightPass = await bcrypt.compare(oldPass, bdPass);
		logger.info({ password: rightPass });
		if (rightPass) {
			const passwordHash = await bcrypt.hash(newPass, SALT);
			await this.ORM.put({ password: passwordHash }, id, "users", "password");
			return true;
		}
		return false;
	};

	profilePut: SettingsServiceRepo["profilePut"] = async (id, profile) => {
    const { tags, location, ...data } = profile;
		logger.info({ prof: profile });
		const newLocation = location && this.sharedService.parseLocation(location);

		const payload = newLocation ? { ...data, location: newLocation } : data;

		//@ts-ignore
		const [newProfile] = await this.ORM.put(payload, id, "forms");
		const newTags = await this.sharedService.uploadTags(id, tags, true);
		return { ...newProfile, tags: newTags };
	};

  postAvatar: SettingsServiceRepo["postAvatar"] = async (id, buffer) => {
    const compress = await FileService.imageCompress(buffer);
    
    logger.info(compress.length);

		const yandex = await this.Yandex.upload(compress, ".webp", "/avatars/");
		await this.ORM.put({ avatar: yandex!.Location }, id, "forms", "avatar");
		return yandex?.Location;
	};
}

export default SettingsService;
