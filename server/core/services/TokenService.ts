import { PayloadDTO, UserDTO } from "@s/core/repositories/dto/dtoObjects";
import { TokenRepository } from "@s/core/repositories/TokensRepository";
import jwt from "jsonwebtoken"

export class TokenService {
  constructor(readonly TokenRepository: TokenRepository) {}

  generateTokens(payload: PayloadDTO) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVATE_KEY, {expiresIn: "15m"})
    const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVATE_KEY, {expiresIn: "10d"})
    
    return [accessToken, refreshToken]
  }
  validateAccess(accessToken: string) {
    const information = jwt.verify(accessToken, process.env.ACCESS_PRIVATE_KEY)
    return information
  }
  validateRefresh(refreshToken: string) {
    const information = jwt.verify(refreshToken, process.env.REFRESH_PRIVATE_KEY)
    return information
  }
}