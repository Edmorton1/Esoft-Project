import { JWTDTO, PayloadDTO, UserDTO } from "@s/core/dtoObjects";
import jwt from "jsonwebtoken"

export class TokenService {

  generateTokens(payload: PayloadDTO) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {expiresIn: "10d"})
    const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY, {expiresIn: "10d"})
    
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