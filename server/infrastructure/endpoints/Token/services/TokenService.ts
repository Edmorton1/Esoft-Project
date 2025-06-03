import ORM from "@s/infrastructure/db/requests/ORM";
import UploadFileService from "@s/infrastructure/endpoints/Files/services/UploadFileService";
import TokenHelper from "@s/infrastructure/endpoints/Token/services/TokenHelper";
import { FormDTOServer } from "@s/infrastructure/endpoints/Token/services/validation/RegistrationZOD";
import logger from "@s/logger";
import { one } from "@shared/MAPPERS";
import { FormDTO, TagsDTO, UserDTO } from "@t/gen/dtoObjects";
import { Form, FormSchema, Tags, User } from "@t/gen/Users";
import { Response } from "express";

class TokenService {
	registration = async (formDTO: Omit<FormDTOServer, 'password' | 'email' | 'tags'>, userDTO: UserDTO, tags: TagsDTO[], res: Response): Promise<{form: Form, user: User, accessToken: string}> => {
		const user = one(await ORM.post(userDTO, "users"));
		const avatar = formDTO.avatar && (await UploadFileService.uploadAvatar(formDTO.avatar));
		const formPost: FormDTO = {...formDTO, avatar, id: user.id};
		const form = one(await ORM.post(formPost, "forms"));

		// logger.info(form, "ФОРМА");``

		let tagsTotal: Tags[] = [];

		if (tags.length > 0) {
			const tagsDB = await ORM.postArr(tags, "tags");
			const tagDBParseToUser = tagsDB.map(e => ({id: form.id, tagid: e.id}));
			tagsTotal = (await ORM.postArr(tagDBParseToUser, "user_tags", true)).map(e => ({id: e.id, tag: tagsDB.find(tag => tag.id === e.tagid)!.tag}));
		}

		// const location = parseWKB
		const formTotal = {...form, tags: tagsTotal};
		logger.info({formTotal})
		//ТУТ ВЫДАЁТ ОШИБКУ
		const formParse = FormSchema.parse(formTotal)
		logger.info('formTotal', formParse)

		const accessToken = await TokenHelper.createTokens(user.id, user.role, res);

		const total = {
			form: formParse,
			user,
			accessToken,
		};

    return total
	}
}

export default new TokenService;
