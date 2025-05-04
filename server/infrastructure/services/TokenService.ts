import { JWTDTO, PayloadDTO, UserDTO } from "@s/core/dtoObjects";
import { one } from "@s/infrastructure/db/Mappers";
import { ORM } from "@s/infrastructure/db/requests/ORM";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class TokenService {
  constructor(
    readonly ORM: ORM
  ) {}


  generateTokens(payload: PayloadDTO) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY!, {expiresIn: "10d"})
    const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY!, {expiresIn: "10d"})
    
    return [accessToken, refreshToken]
  }

  async validateAccess(accessToken: string): Promise<JWTDTO | false> {
    try {

      const token = jwt.verify(accessToken, process.env.ACCESS_PRIVATE_KEY!) as JWTDTO
      if (one(await this.ORM.getById(token.id, 'users'))) {
        return token
      } else return false
      
    } catch {
      return false
    }
  }
  
  async validateRefresh(refreshToken: string): Promise<JWTDTO | false> {
    try {
      const token = jwt.verify(refreshToken, process.env.REFRESH_PRIVATE_KEY!) as JWTDTO
      const hashInDB = one(await this.ORM.getById(token.id, 'tokens')).token

      const hasDB = await bcrypt.compare(refreshToken, hashInDB)
      // const hasUser = one(await this.ORM.getById(token.id, 'users'))

      if (hasDB) {
        return token
      } else return false
    } catch {
      return false
    }
  }
}