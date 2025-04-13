import { CRUDRepository } from "@s/core/repositories/CRUDRepository";
import { UserDTO, PayloadDTO } from "@s/core/repositories/dto/dtoObjects";
import { TokenService } from "@s/core/services/TokenService";
import { Request, Response } from "webpack-dev-server";
import bcrypt from "bcrypt"

export class HttpTokenController {
  constructor(
    readonly TokenService: TokenService,
    readonly CRUD: CRUDRepository
  ) {}

  async createTokens(id: number, role: string, res: Response) {
    console.log(id, role)
    const tokens = this.TokenService.generateTokens({id: id, role: role})
    const [accessToken, refreshToken] = tokens
    await this.CRUD.delete(id, 'tokens')
    await this.CRUD.post({id: id, token: refreshToken}, 'tokens')
    res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 60 * 24})
    return accessToken
  }

  async registartion(req: Request, res: Response) {
    const dto: UserDTO = req.body
    const user = await this.CRUD.post(dto, 'users')
    const accessToken = await this.createTokens(user.id, user.role, res)
    
    res.json({
      ...user,
      accessToken: accessToken
    })
  }
  //@ts-ignore
  async login(req: Request, res: Response): Response<any, Record<UserDTO, any>> {
    const dto: UserDTO = req.body
    const user = await this.CRUD.getByParams({email: dto.email}, 'users')


    if (!user) {
      return res.status(400).json('Такой почты нет')
    }
    const passwordValidate =  await bcrypt.compare(dto.password, user.password)
    if (!passwordValidate) {
      return res.status(400).json('Неверный пароль')
    }

    const accessToken = await this.createTokens(user.id, user.role, res)

    res.json({
      user,
      accessToken: accessToken
    })
    console.log(dto)
  }
  async logout(req: Request, res: Response) {
    const {id} = req.params
    console.log('logout')
    res.clearCookie('refreshToken')
    await this.CRUD.delete(id, 'tokens')
    res.send('Выход выполнен')
  }
}