import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { Form, User } from "@t/gen/Users";
import AuthService from "@s/infrastructure/endpoints/Auth/services/Auth.service";
import logger from "@s/helpers/logger";
import { COOKIE_NAME } from "@shared/CONST";
import { inject, injectable } from "inversify";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";
import AuthValidation from "@s/infrastructure/endpoints/Auth/validation/Auth.validation";
import TYPES from "@s/routes/containers/types";
// import SessionRedis from "@s/infrastructure/redis/SessionRedis";

export interface LoginErrorTypes {
  type: "email" | "password",
  message: string
}

interface AuthControllerRepo {
  registartion(req: Request, res: Response): Promise<void>,
  checkEmail(req: Request, res: Response): Promise<void>,
  login(req: Request, res: Response): Promise<void>,
  logout(req: Request, res: Response): Promise<void>,
  initial(req: Request, res: Response): Promise<void>,
}

@injectable()
class AuthController implements AuthControllerRepo {
  constructor(
    @inject(ORMCopy)
    private readonly ORM: ORMCopy,
    @inject(AuthService)
    private readonly AuthService: AuthService
  ) {}

  registartion = async (req: Request, res: Response<{form: Form, user: User}>) => {
    const [user, form, tags] = AuthValidation.registration(req)
    const total = await this.AuthService.registration(form, user, tags)

    // req.session.sessionid = await SessionRedis.set({id: total.user.id, role: total.user.role})
    req.session.userid = total.user.id
    req.session.role = total.user.role

    res.json(total)
  }

  checkEmail = async (req: Request, res: Response<boolean>) => {
    const email = AuthValidation.checkEmail(req)
    const findThis = await this.ORM.getByParams({email}, "users", "email")
    logger.info(findThis)
    if (!findThis.length) {res.json(true); return;}
    res.json(false)
  }

  // login = async (req: Request, res: Response<{user: any, accessToke: any}>) => {
  login = async (req: Request, res: Response<User | LoginErrorTypes>) => {
    const dto = AuthValidation.login(req)
    logger.info({dtoUser: dto})
    const [user] = await this.ORM.getByParams({email: dto.email}, 'users')

    logger.info({user})

    if (!user) {
      logger.info({user, STATUS: "ТАКОГОЙ ПОЧТЫ НЕТ"})
      res.status(401).json(<LoginErrorTypes>{type: "email", message: "Такой почты нет"})
      return;
    }

    const passwordValidate =  await bcrypt.compare(dto.password, user.password)
    if (!passwordValidate) {
      logger.info({user, STATUS: "НЕВЕРНЫЙ ПАРОЛЬ"})
      res.status(401).json(<LoginErrorTypes>{type: "password", message: 'Неверный пароль'})
      return;
    }

    logger.info({user, STATUS: "ВОШЁЛ"})

    req.session.userid = user.id
    req.session.role = user.role
    logger.info({SESSION: req.session})
    res.json(user)
  }
  
  logout = async (req: Request, res: Response) => {
    req.session.destroy((error) => logger.info(error))
    res.clearCookie(COOKIE_NAME)
    res.sendStatus(200)
  }

  initial = async (req: Request, res: Response<User>) => {
    const userid = req.session.userid
    if (!userid) {res.sendStatus(401); return}

    const [user] = await this.ORM.getById(userid, "users")
    res.json(user)
  }
}

export default AuthController

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