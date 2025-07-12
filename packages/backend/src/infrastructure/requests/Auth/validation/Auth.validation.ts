import { FormDTOServer, RegistrationDTOServerSchema } from "@app/server/types/Auth.zod";
import logger from "@app/server/infrastructure/helpers/logger/logger";
import { TagsDTO, UserDTO, UserDTOSchema } from "@app/types/gen/dtoObjects";
import { z } from "zod";
import HttpContext from "@app/server/config/express/Http.context";
import { GOOGLE_TEMP_COOKIE } from "@app/shared/HEADERS";
import { GoogleDataSchema } from "@app/types/gen/Schemas";

class AuthValidation {
  registration = (ctx: HttpContext): [UserDTO, Omit<FormDTOServer, 'tags' | 'email' | 'password'>, TagsDTO[]] => {
    logger.info({dataRow: JSON.parse(ctx.body.json)}, "Грязные")
    const cookie = ctx.service.req.cookies[GOOGLE_TEMP_COOKIE]
    logger.info({КУКА_ВНУТРИ_ВАЛИДАЦИИ: cookie})
    let parsedCookie
    try {
      parsedCookie = GoogleDataSchema.parse(JSON.parse(cookie))
    } catch {
      parsedCookie = undefined
    }
  
    // logger.info(req.file)

    const data = RegistrationDTOServerSchema.parse({...JSON.parse(ctx.body.json), avatar: ctx.file, google_id: parsedCookie?.google_id})
    // const asd = ctx.file
    logger.info({До_Загрузки: data})
    if (data.password !== null && data.google_id) throw new Error("Если Google id, то password должен быть null")
      
    const {email, password, google_id, tags, ...formDTO} = data
    const userDTO: UserDTO = {email, password, google_id}

    return [userDTO, formDTO, tags]
  }
  checkEmail = (ctx: HttpContext) => {
    const email = z.coerce.string().parse(ctx.params.email)
    return email
  }

  login = (ctx: HttpContext): UserDTO => {
    const dto = UserDTOSchema.parse(ctx.body)

    logger.info({parsed: dto})
    return dto
  }
}

export default new AuthValidation