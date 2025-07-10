import { FormDTOServer } from "@app/server/infrastructure/requests/Auth/validation/Auth.zod";
import { FormDTO, TagsDTO, UserDTO } from "@app/types/gen/dtoObjects";
import { Form, FormSchema, User } from "@app/types/gen/Users";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import { inject, injectable } from "inversify";
import type { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";
import FilesService from "@app/server/infrastructure/requests/shared/services/Files.service";
import SharedService from "@app/server/infrastructure/requests/shared/services/Shared.service";

interface AuthServiceRepo {
	registration: (formDTO: Omit<FormDTOServer, 'password' | 'email' | 'tags'>, userDTO: UserDTO, tags: TagsDTO[]) => Promise<{form: Form, user: User}>
}

@injectable()
class AuthService implements AuthServiceRepo{
	constructor(
		@inject(SharedService)
		private readonly sharedService: SharedService,
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(ORM)
		private readonly ORM: ORM,
		@inject(FilesService)
		private readonly UploadFileService: FilesService
	) {}
	
	registration: AuthServiceRepo['registration'] = async (formDTO, userDTO, tags) => {
		const [user] = await this.ORM.post(userDTO, "users");
		const avatar = formDTO.avatar && (await this.UploadFileService.uploadAvatar(formDTO.avatar));
		const formPost: FormDTO = {...formDTO, avatar, id: user.id};
		const [form] = await this.ORM.post(formPost, "forms");

		// logger.info(form, "ФОРМА");``

		// let tagsTotal: Tags[] = [];
		const tagsTotal = this.sharedService.uploadTags(user.id, tags, true)

		// if (tags.length > 0) {
		// 	const tagsDB = await this.ORM.postArr(tags, "tags");
		// 	const tagDBParseToUser = tagsDB.map(e => ({id: form.id, tagid: e.id}));
		// 	tagsTotal = (await this.ORM.postArr(tagDBParseToUser, "user_tags")).map(e => ({id: e.id, tag: tagsDB.find(tag => tag.id === e.tagid)!.tag}));
		// }

		// const location = parseWKB
		const formTotal = {...form, tags: tagsTotal};
		this.logger.info({formTotal})
		//ТУТ ВЫДАЁТ ОШИБКУ
		const formParse = FormSchema.parse(formTotal)
		this.logger.info('formTotal', formParse)

		const total = {
			form: formParse,
			user,
		};

    return total
	}
}

export default AuthService;
