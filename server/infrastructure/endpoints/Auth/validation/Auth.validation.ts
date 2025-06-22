import { FormDTOServer, RegistrationDTOServerSchema } from "@s/infrastructure/endpoints/Auth/validation/Auth.zod";
import logger from "@s/helpers/logger";
import { TagsDTO, UserDTO, UserDTOSchema } from "@t/gen/dtoObjects";
import { Request } from "express";

export interface ReqLogin {
  dto: UserDTO
}

class AuthValidation {
  registration = (req: Request): [UserDTO, Omit<FormDTOServer, 'tags' | 'email' | 'password'>, TagsDTO[]] => {
    logger.info({dataRow: JSON.parse(req.body.json)}, "Грязные")
    // logger.info(req.file)

    const data = RegistrationDTOServerSchema.parse({...JSON.parse(req.body.json), avatar: req.file})
    logger.info({До_Загрузки: data})
      
    const {email, password, tags, ...formDTO} = data
    const userDTO: UserDTO = {email, password}

    return [userDTO, formDTO, tags]
  }

  login = (req: Request): UserDTO => {
    const dto = UserDTOSchema.parse(req.body)

    logger.info({parsed: dto})
    return dto
  }
}

export default new AuthValidation