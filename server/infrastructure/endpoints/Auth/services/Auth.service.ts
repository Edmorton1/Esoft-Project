import FilesService from "@s/infrastructure/services/Files.service";
import { FormDTOServer } from "@s/infrastructure/endpoints/Auth/validation/Auth.zod";
import logger from "@s/helpers/logger";
import { FormDTO, TagsDTO, UserDTO } from "@t/gen/dtoObjects";
import { Form, FormSchema, Tags, User } from "@t/gen/Users";
import ORM from "@s/infrastructure/db/SQL/ORM";
import { inject, injectable } from "inversify";

interface AuthServiceRepo {
	registration: (formDTO: Omit<FormDTOServer, 'password' | 'email' | 'tags'>, userDTO: UserDTO, tags: TagsDTO[]) => Promise<{form: Form, user: User}>
}

@injectable()
class AuthService implements AuthServiceRepo{
	constructor(
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

		let tagsTotal: Tags[] = [];

		//@ts-ignore
		// ПОТОМ ПОМЕНЯТЬ НА TAGS SERVICE

		if (tags.length > 0) {
			const tagsDB = await this.ORM.postArr(tags, "tags");
			const tagDBParseToUser = tagsDB.map(e => ({id: form.id, tagid: e.id}));
			tagsTotal = (await this.ORM.postArr(tagDBParseToUser, "user_tags")).map(e => ({id: e.id, tag: tagsDB.find(tag => tag.id === e.tagid)!.tag}));
		}

		// const location = parseWKB
		const formTotal = {...form, tags: tagsTotal};
		logger.info({formTotal})
		//ТУТ ВЫДАЁТ ОШИБКУ
		const formParse = FormSchema.parse(formTotal)
		logger.info('formTotal', formParse)

		const total = {
			form: formParse,
			user,
		};

    return total
	}
}

export default AuthService;
