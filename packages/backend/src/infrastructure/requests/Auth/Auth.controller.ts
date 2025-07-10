import bcrypt from "bcrypt"
import { Form, User } from "@app/types/gen/Users";
import AuthService from "@app/server/infrastructure/requests/Auth/services/Auth.service";
import logger from "@app/server/infrastructure/helpers/logger/logger";
import { COOKIE_NAME } from "@app/shared/CONST";
import { inject, injectable } from "inversify";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import AuthValidation from "@app/server/infrastructure/requests/Auth/validation/Auth.validation";
import BaseController from "@app/server/config/base/Base.controller";
import { serverPaths } from "@app/shared/PATHS";
import { upload } from "@app/server/infrastructure/requests/shared/multer";
import HttpContext from "@app/server/config/express/Http.context";
import AuthMiddleware from "@app/server/infrastructure/requests/shared/middlewares/AuthMiddleware";
import { LoginErrorTypes } from "@app/types/gen/ErrorTypes";
// import SessionRedis from "@app/server/infrastructure/redis/SessionRedis";

interface IAuthController {
  registartion(ctx: HttpContext<{form: Form, user: User}>): Promise<void>,
  checkEmail(ctx: HttpContext<boolean>): Promise<void>,
  login(ctx: HttpContext<User | LoginErrorTypes>): Promise<void>,
  logout(ctx: HttpContext): Promise<void>,
  initial(ctx: HttpContext<User>): Promise<void>,
}

@injectable()
class AuthController extends BaseController implements IAuthController {
  constructor(
    @inject(ORM)
    private readonly ORM: ORM,
    @inject(AuthService)
    private readonly AuthService: AuthService
  ) {
    super()
    this.bindRoutes([
      {
        path: serverPaths.registration,
        method: "post",
        middlewares: [upload.single("avatar")],
        handle: this.registartion,
      },
      {
        path: serverPaths.login,
        method: "post",
        handle: this.login,
      },
      {
        path: serverPaths.logout,
        method: "post",
        middlewares: [AuthMiddleware.OnlyAuth],
        handle: this.logout
      },
      {
        path: serverPaths.initial,
        method: "get",
        handle: this.initial,
      },
      {
        path: `${serverPaths.checkEmail}/:email`,
        method: "get",
        handle: this.checkEmail,
      },
    ]);
  }

  registartion: IAuthController['registartion'] = async (ctx) => {
    const [user, form, tags] = AuthValidation.registration(ctx)
    const total = await this.AuthService.registration(form, user, tags)

    // req.session.sessionid = await SessionRedis.set({id: total.user.id, role: total.user.role})
    ctx.session.userid = total.user.id
    ctx.session.role = total.user.role

    ctx.json(total)
  }

  checkEmail: IAuthController['checkEmail'] = async (ctx) => {
    const email = AuthValidation.checkEmail(ctx)
    const findThis = await this.ORM.getByParams({email}, "users", "email")
    logger.info(findThis)
    if (!findThis.length) {ctx.json(true); return;}
    ctx.json(false)
  }

  login: IAuthController['login'] = async (ctx) => {
    const dto = AuthValidation.login(ctx)
    logger.info({dtoUser: dto})
    const [user] = await this.ORM.getByParams({email: dto.email}, 'users')

    logger.info({user})

    if (!user) {
      logger.info({user, STATUS: "ТАКОГОЙ ПОЧТЫ НЕТ"})
      // ctx.status(401).json(<LoginErrorTypes>{type: "email", message: "Такой почты нет"})
      ctx.statusJson<LoginErrorTypes>(401, {type: "email", message: "Такой почты нет"})
      return;
    }

    const passwordValidate =  await bcrypt.compare(dto.password, user.password)
    if (!passwordValidate) {
      logger.info({user, STATUS: "НЕВЕРНЫЙ ПАРОЛЬ"})
      ctx.statusJson<LoginErrorTypes>(401, {type: "password", message: 'Неверный пароль'})
      return;
    }

    logger.info({user, STATUS: "ВОШЁЛ"})

    ctx.session.userid = user.id
    ctx.session.role = user.role
    logger.info({SESSION: ctx.session})
    ctx.json(user)
  }
  
  logout = async (ctx: HttpContext) => {
    ctx.session.destroy((error) => logger.info(error))
    ctx.clearCookie(COOKIE_NAME)
    ctx.sendStatus(200)
  }

  initial: IAuthController['initial'] = async (ctx) => {
    const userid = ctx.session.userid
    if (!userid) {ctx.sendStatus(401); return}

    const [user] = await this.ORM.getById(userid, "users")
    ctx.json(user)
  }
}

export default AuthController
