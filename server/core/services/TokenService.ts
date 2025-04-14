import { JWTDTO, PayloadDTO, UserDTO } from "@s/core/repositories/dto/dtoObjects";
import { TokenRepository } from "@s/core/repositories/TokensRepository";
import jwt from "jsonwebtoken"

export class TokenService {
  constructor(readonly TokenRepository: TokenRepository) {}

  generateTokens(payload: PayloadDTO) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {expiresIn: "15m"})
    const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY, {expiresIn: "1d"})
    
    return [accessToken, refreshToken]
  }

  validateAccess(accessToken: string): JWTDTO | false {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_PRIVATE_KEY) as JWTDTO
    } catch {
      return false
    }
  }
  
  validateRefresh(refreshToken: string): JWTDTO | false {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_PRIVATE_KEY) as JWTDTO
    } catch {
      return false
    }
  }
}