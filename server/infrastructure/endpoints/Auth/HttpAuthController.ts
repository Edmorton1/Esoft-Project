import ORM from "@s/infrastructure/db/requests/ORM";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { Form, User } from "@t/gen/Users";
import TokenService from "@s/infrastructure/endpoints/Auth/services/TokenService";
import logger from "@s/logger";
import { ReqLogin, RequestReg } from "@s/infrastructure/endpoints/Auth/middlewares/AuthoMid";
import SessionRedis from "@s/infrastructure/redis/SessionRedis";

export interface LoginErrorTypes {
  type: "email" | "password",
  message: string
}

class HttpAuthController {
  registartion = async (req: Request, res: Response): Promise<Response<{form: Form, user: User, accessToken: string}>> => {

    const r = req as RequestReg
    const total = await TokenService.registration(r.form, r.user, r.tags)

    req.session.sessionid = await SessionRedis.set({id: total.user.id, role: total.user.role})

    return res.json(total)
  }

  // login = async (req: Request, res: Response<{user: any, accessToke: any}>) => {
  login = async (req: Request, res: Response<User | LoginErrorTypes>) => {
    const r = req as ReqLogin

    const dto = r.dto
    logger.info({dtoUser: dto})
    const [user] = await ORM.getByParams({email: dto.email}, 'users')

    logger.info({user})

    if (!user) {
      logger.info({user, STATUS: "ТАКОГОЙ ПОЧТЫ НЕТ"})
      return res.status(400).json(<LoginErrorTypes>{type: "email", message: "Такой почты нет"})
    }

    const passwordValidate =  await bcrypt.compare(dto.password, user.password)
    if (!passwordValidate) {
      logger.info({user, STATUS: "НЕВЕРНЫЙ ПАРОЛЬ"})
      return res.status(400).json(<LoginErrorTypes>{type: "password", message: 'Неверный пароль'})
    }

    logger.info({user, STATUS: "ВОШЁЛ"})

    // const accessToken = await TokenHelper.createTokens(user.id, user.role, res)
    // TokenHelper.returnDTO({user, accessToken}, res)

    req.session.sessionid = await SessionRedis.set({id: user.id, role: user.role})
    
    res.json(user)
  }
  
  logout = async (req: Request, res: Response) => {
    // const r = req as RequestOnlyId

    // res.clearCookie('refreshToken')
    // await ORM.delete(id, 'tokens')
    
    const sessionid = req.session.sessionid
    if (!sessionid) return res.sendStatus(401)
    SessionRedis.del(sessionid)
    req.session.destroy((error) => logger.info(error))
    res.sendStatus(200)
  }

  // refresh = async (req: Request, res: Response) => {
  //   // ТУТ ПОСМОТРЕТЬ ПОТОМ ГДЕ !
  //   const authHeader = req.headers.authorization
  //   let accessToken = ''
  //   if (authHeader?.startsWith('Bearer')) {
  //     accessToken = req.headers.authorization!.split(' ')[1]
  //   }

  //   const verifyAccess = await TokenHelper.validateAccess(accessToken)
    
  //   if (verifyAccess) {
  //     // logger.info('access')
  //     const user = one(await ORM.getById(verifyAccess.id, 'users'))
  //     return TokenHelper.returnDTO({user, accessToken}, res)
  //   }
    
  //   const verifyRefresh = await TokenHelper.validateRefresh(req.cookies.refreshToken)

  //   if (!verifyAccess && verifyRefresh) {
  //     // logger.info('refresh')
  //     const user = one(await ORM.getById(verifyRefresh.id, 'users'))
  //     const accessToken = await TokenHelper.createTokens(verifyRefresh.id, verifyRefresh.role, res)
  //     return TokenHelper.returnDTO({user, accessToken}, res)
  //   }
  //   logger.info('Не прошёл')
  //   res.clearCookie('refreshToken')
  //   res.sendStatus(401)
  // }
  initial = async (req: Request, res: Response<User>) => {
    const sessionid = req.session.sessionid
    if (!sessionid) return res.sendStatus(401)
    const dto = await SessionRedis.get(sessionid)
    if(!dto) return res.sendStatus(401)
    const [user] = await ORM.getById(dto.id, "users")
    res.json(user)
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ2MTEyMTgsImV4cCI6MTc0NTQ3NTIxOH0.pDfrXzd7atVa2BtLwBM7a8HES_D76idPCYKntKFYe_Y -- ВАЛДИНЫЙ РЕФРЕШ
export default new HttpAuthController