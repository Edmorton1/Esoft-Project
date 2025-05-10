import ORM from "@s/infrastructure/db/requests/ORM";
import { UserDTO, TokenDTO } from "@s/core/dtoObjects";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { one } from "@shared/MAPPERS";
import TokenService from "@s/infrastructure/endpoints/Token/services/TokenService";

class HttpTokenController {

  createTokens = async (id: number, role: string, res: Response) => {
    // console.log(id, role)
    // console.log("CREATE TOKENS")
    const tokens = TokenService.generateTokens({id: id, role: role})
    const [accessToken, refreshToken] = tokens
    // await this.ORM.delete(id, 'tokens')
    const refreshHash = await bcrypt.hash(refreshToken, 3)
    const tokensInDB = await ORM.getById(id, 'tokens')
    if (tokensInDB) {
      await ORM.put({token: refreshHash}, id, 'tokens')
    } else {
      await ORM.post({id: id, token: refreshHash}, 'tokens')
    }
    res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 60 * 24})
    return accessToken
  }

  returnDTO = (dto: TokenDTO, res: Response) => {
    res.json({
      user: dto.user,
      accessToken: dto.accessToken
    })
  }

  registartion = async (req: Request, res: Response) => {
    const dto: UserDTO = req.body
    const user = one(await ORM.post(dto, 'users'))
    const accessToken = await this.createTokens(user.id, user.role, res)
    
    this.returnDTO({user, accessToken}, res)
  }

  login = async (req: Request, res: Response) => {
    const dto: UserDTO = req.body
    const user = one(await ORM.getByParams({email: dto.email}, 'users'))
    console.log(user.id, user.role)

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
  
  logout = async (req: Request, res: Response) => {
    const {id} = req.params

    res.clearCookie('refreshToken')
    await ORM.delete(id, 'tokens')
    res.status(200).send('Выход выполнен')
  }


  refresh = async (req: Request, res: Response) => {
    // ТУТ ПОСМОТРЕТЬ ПОТОМ ГДЕ !
    const authHeader = req.headers.authorization
    let accessToken: string = ''
    if (authHeader?.startsWith('Bearer')) {
      accessToken = req.headers.authorization!.split(' ')[1]
    }

    const verifyAccess = await TokenService.validateAccess(accessToken)
    
    if (verifyAccess) {
      // console.log('access')
      const user = one(await ORM.getById(verifyAccess.id, 'users'))
      return this.returnDTO({user, accessToken}, res)
    }
    
    const verifyRefresh = await TokenService.validateRefresh(req.cookies.refreshToken)

    if (!verifyAccess && verifyRefresh) {
      // console.log('refresh')
      const user = one(await ORM.getById(verifyRefresh.id, 'users'))
      const accessToken = await this.createTokens(verifyRefresh.id, verifyRefresh.role, res)
      return this.returnDTO({user, accessToken}, res)
    }
    console.log('Не прошёл')
    res.clearCookie('refreshToken')
    res.status(401).send('Нет валидных токенов')
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDQ2MTEyMTgsImV4cCI6MTc0NTQ3NTIxOH0.pDfrXzd7atVa2BtLwBM7a8HES_D76idPCYKntKFYe_Y -- ВАЛДИНЫЙ РЕФРЕШ
export default new HttpTokenController