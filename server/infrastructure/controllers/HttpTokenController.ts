import { ORM } from "@s/infrastructure/db/ORM";
import { UserDTO, PayloadDTO, TokenDTO } from "@s/core/dtoObjects";
import { TokenService } from "@s/infrastructure/services/TokenService";
import { Request, Response } from "webpack-dev-server";
import bcrypt from "bcrypt"

export class HttpTokenController {
  constructor(
    readonly TokenService: TokenService,
    readonly ORM: ORM
  ) {}

  async createTokens(id: number, role: string, res: Response) {
    console.log(id, role)
    const tokens = this.TokenService.generateTokens({id: id, role: role})
    const [accessToken, refreshToken] = tokens
    // await this.ORM.delete(id, 'tokens')
    await this.ORM.post({id: id, token: refreshToken}, 'tokens', 'ON CONFLICT DO NOTHING')
    res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 60 * 24})
    return accessToken
  }

  returnDTO(dto: TokenDTO, res: Response) {
    res.json({
      user: dto.user,
      accessToken: dto.accessToken
    })
  }

  async registartion(req: Request, res: Response) {
    const dto: UserDTO = req.body
    const user = await this.ORM.post(dto, 'users')
    const accessToken = await this.createTokens(user.id, user.role, res)
    
    this.returnDTO({user, accessToken}, res)
  }

  async login(req: Request, res: Response) {
    const dto: UserDTO = req.body
    const user = await this.ORM.getByParams({email: dto.email}, 'users')

    if (!user) {
      return res.status(400).json('Такой почты нет')
    }

    const passwordValidate =  await bcrypt.compare(dto.password, user.password)
    if (!passwordValidate) {
      return res.status(400).json('Неверный пароль')
    }

    const accessToken = await this.createTokens(user.id, user.role, res)
    this.returnDTO({user, accessToken}, res)
  }
  
  async logout(req: Request, res: Response) {
    const {id} = req.params

    res.clearCookie('refreshToken')
    await this.ORM.delete(id, 'tokens')
    res.status(200).send('Выход выполнен')
  }


  async refresh(req: Request, res: Response) {
    const accessToken = req.headers.authorization.split(' ')[1]
    const verifyAccess = this.TokenService.validateAccess(accessToken)
    
    if (verifyAccess) {
      console.log('access')
      const user = await this.ORM.getById(verifyAccess.id, 'users')
      return this.returnDTO({user, accessToken}, res)
    }
    
    const verifyRefresh = this.TokenService.validateRefresh(req.cookies.refreshToken)

    if (!verifyAccess && verifyRefresh) {
      console.log('refresh')
      const user = await this.ORM.getById(verifyRefresh.id, 'users')
      const accessToken = await this.createTokens(verifyRefresh.id, verifyRefresh.role, res)
      return this.returnDTO({user, accessToken}, res)
    }
    console.log('Не прошёл')
    res.clearCookie('refreshToken')
    res.status(401).send('Нет валидных токенов')
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ2MTEyMTgsImV4cCI6MTc0NTQ3NTIxOH0.pDfrXzd7atVa2BtLwBM7a8HES_D76idPCYKntKFYe_Y -- ВАЛДИНЫЙ РЕФРЕШ