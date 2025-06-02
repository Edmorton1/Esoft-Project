import ORM from "@s/infrastructure/db/requests/ORM";
import { UserDTO } from "@t/gen/dtoObjects";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { one } from "@shared/MAPPERS";
import TokenHelper from "@s/infrastructure/endpoints/Token/services/TokenHelper";
import { Form, User, UserRoleType } from "@t/gen/Users";
import TokenService from "@s/infrastructure/endpoints/Token/services/TokenService";
import { RegistrationDTOServerSchema } from "@s/infrastructure/endpoints/Token/services/validation/RegistrationZOD";
import logger from "@s/logger";

class HttpTokenController {
  registartion = async (req: Request, res: Response): Promise<Response<{form: Form, user: User, accessToken: string}>> => {
  // registartion = async (req: Request, res: Response) => {
    logger.info("Грязные", JSON.parse(req.body.json))
    logger.info(req.file)
    const data = RegistrationDTOServerSchema.parse({...JSON.parse(req.body.json), avatar: req.file})
    // logger.info(data)
    const {email, password, tags, ...formDTO} = data
    const userDTO: UserDTO = {email, password}

    const total = await TokenService.registration(formDTO, userDTO, tags, res)

    return res.json(total)
  }

  login = async (req: Request, res: Response) => {
    const dto: UserDTO = req.body
    const user = one(await ORM.getByParams({email: dto.email}, 'users'))
    logger.info(user.id, user.role)

    if (!user) {
      return res.status(400).json('Такой почты нет')
    }

    const passwordValidate =  await bcrypt.compare(dto.password, user.password)
    if (!passwordValidate) {
      return res.status(400).json('Неверный пароль')
    }

    const accessToken = await TokenHelper.createTokens(user.id, user.role, res)
    TokenHelper.returnDTO({user, accessToken}, res)
  }
  
  logout = async (req: Request, res: Response) => {
    const {id} = req.params

    res.clearCookie('refreshToken')
    await ORM.delete(id, 'tokens')
    res.status(200).send('Выход выполнен')
  }


  refresh = async (req: Request, res: Response) => {
    // ТУТ ПОСМОТРЕТЬ ПОТОМ ГДЕ !
    const authHeader = req.headers.authorization
    let accessToken = ''
    if (authHeader?.startsWith('Bearer')) {
      accessToken = req.headers.authorization!.split(' ')[1]
    }

    const verifyAccess = await TokenHelper.validateAccess(accessToken)
    
    if (verifyAccess) {
      // logger.info('access')
      const user = one(await ORM.getById(verifyAccess.id, 'users'))
      return TokenHelper.returnDTO({user, accessToken}, res)
    }
    
    const verifyRefresh = await TokenHelper.validateRefresh(req.cookies.refreshToken)

    if (!verifyAccess && verifyRefresh) {
      // logger.info('refresh')
      const user = one(await ORM.getById(verifyRefresh.id, 'users'))
      const accessToken = await TokenHelper.createTokens(verifyRefresh.id, verifyRefresh.role, res)
      return TokenHelper.returnDTO({user, accessToken}, res)
    }
    logger.info('Не прошёл')
    res.clearCookie('refreshToken')
    res.sendStatus(401)
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ2MTEyMTgsImV4cCI6MTc0NTQ3NTIxOH0.pDfrXzd7atVa2BtLwBM7a8HES_D76idPCYKntKFYe_Y -- ВАЛДИНЫЙ РЕФРЕШ
export default new HttpTokenController