import Yandex from "@app/server/infrastructure/helpers/yandex";
import { inject, injectable } from "inversify";
import { SALT } from "@app/shared/CONST";
import bcrypt from "bcrypt";
import { ProfileSchema } from "@app/server/infrastructure/requests/Settings/validation/Settings.validation";
import { Form } from "@app/types/gen/Users";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";
import SharedService from "@app/server/infrastructure/requests/shared/services/Shared.service";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import CompressService from "@app/server/infrastructure/requests/shared/services/Compress.service";

interface SettingsServiceRepo {
  postAvatar: (id: number, buffer: Buffer<ArrayBufferLike>) => Promise<string | undefined>;
  passwordCompare: (id: number, oldPass: string, newPass: string) => Promise<boolean>;
  profilePut: (id: number, profile: ProfileSchema) => Promise<Form>
}

@injectable()
class SettingsService implements SettingsServiceRepo {
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(Yandex)
		private readonly Yandex: Yandex,
		@inject(ORM)
		private readonly ORM: ORM,
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
		this.logger.info({ bdPass });
		const rightPass = await bcrypt.compare(oldPass, bdPass);
		this.logger.info({ password: rightPass });
		if (rightPass) {
			const passwordHash = await bcrypt.hash(newPass, SALT);
			await this.ORM.put({ password: passwordHash }, id, "users", id, "password");
			return true;
		}
		return false;
	};

	profilePut: SettingsServiceRepo["profilePut"] = async (id, profile) => {
    const { tags, location, ...data } = profile;
		this.logger.info({ prof: profile });
		const newLocation = location && this.sharedService.parseLocation(location);

		const payload = newLocation ? { ...data, location: newLocation } : data;
		const [newProfile] = await this.ORM.put(payload, id, "forms", id);
		const newTags = await this.sharedService.uploadTags(id, tags, true);
		return { ...newProfile, tags: newTags };
	};

  postAvatar: SettingsServiceRepo["postAvatar"] = async (id, buffer) => {
    const compress = await CompressService.imageCompress(buffer);
    
    this.logger.info(compress.length);

		const yandex = await this.Yandex.upload(compress, ".webp", "/avatars/");
		await this.ORM.put({ avatar: yandex!.Location }, id, "forms", id, "avatar");
		return yandex?.Location;
	};
}

export default SettingsService;
