import { RegistrationDTOServerSchema } from "@s/infrastructure/endpoints/Auth/services/validation/RegistrationZOD";
import logger from "@s/helpers/logger";
import { UserDTO, UserDTOSchema } from "@t/gen/dtoObjects";
import { NextFunction, Request, Response } from "express";

//@ts-ignore
//ПОТОМ ЗДЕСЬ УБРАТЬ any

export interface RequestReg extends Request{
  user: any,
  form: any,
  tags: any,
}

export interface ReqLogin extends Request {
  dto: UserDTO
}

class AuthoMid {
  registration = (req: Request, res: Response, next: NextFunction) => {
    const r = req as RequestReg
    
    logger.info({dataRow: JSON.parse(req.body.json)}, "Грязные")
    // logger.info(req.file)

    const data = RegistrationDTOServerSchema.parse({...JSON.parse(req.body.json), avatar: req.file})
    logger.info({До_Загрузки: data})
      
    const {email, password, tags, ...formDTO} = data
    const userDTO: UserDTO = {email, password}

    r.user = userDTO;
    r.form = formDTO;
    r.tags = tags

    next()
  }

  login = (req: Request, res: Response, next: NextFunction) => {
    const r = req as ReqLogin

    const dto = UserDTOSchema.parse(req.body)

    logger.info({parsed: dto})
    r.dto = dto
    next()
  }
}

export default new AuthoMid