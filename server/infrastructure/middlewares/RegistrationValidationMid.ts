import { RegistrationDTOServerSchema } from "@s/infrastructure/endpoints/Token/services/validation/RegistrationZOD";
import logger from "@s/logger";
import { UserDTO } from "@t/gen/dtoObjects";
import { NextFunction, Request, Response } from "express";

export interface RequestReg extends Request{
  user: any,
  form: any,
  tags: any
}

function RegistrationValidationMid(req: Request, res: Response, next: NextFunction) {
  const r = req as RequestReg
  
  logger.info({dataRow: JSON.parse(req.body.json)}, "Грязные")
  logger.info(req.file)

  const data = RegistrationDTOServerSchema.parse({...JSON.parse(req.body.json), avatar: req.file})
  logger.info({До_Загрузки: data})
    
  const {email, password, tags, ...formDTO} = data
  const userDTO: UserDTO = {email, password}

  r.user = userDTO;
  r.form = formDTO;
  r.tags = tags

  next()
}

export default RegistrationValidationMid