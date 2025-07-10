import { FormDTOServer, RegistrationDTOServerSchema } from "@app/server/infrastructure/requests/Auth/validation/Auth.zod";
import logger from "@app/server/infrastructure/helpers/logger/logger";
import { TagsDTO, UserDTO, UserDTOSchema } from "@app/types/gen/dtoObjects";
import { z } from "zod";
import HttpContext from "@app/server/config/express/Http.context";

class AuthValidation {
  registration = (ctx: HttpContext): [UserDTO, Omit<FormDTOServer, 'tags' | 'email' | 'password'>, TagsDTO[]] => {
    logger.info({dataRow: JSON.parse(ctx.body.json)}, "Грязные")
    // logger.info(req.file)

    const data = RegistrationDTOServerSchema.parse({...JSON.parse(ctx.body.json), avatar: ctx.file})
    // const asd = ctx.file
    logger.info({До_Загрузки: data})
      
    const {email, password, tags, ...formDTO} = data
    const userDTO: UserDTO = {email, password}

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