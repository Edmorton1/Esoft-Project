import { CRUDController } from "@s/infrastructure/controllers/CRUDController"
import { CRUDRepository } from "@s/core/repositories/CRUDRepository"
import { TokenRepository } from "@s/core/repositories/TokensRepository"
import { TokenService } from "@s/core/services/TokenService"
import { HttpTokenController } from "@s/infrastructure/controllers/HttpTokenController"
import { tables } from "@s/core/domain/types"

export const universalController = (method: keyof CRUDController, table: tables) => {
  const controller = new CRUDController(new CRUDRepository(), table)
  return (controller[method] as Function).bind(controller)
}

export const tokenController = (method: keyof HttpTokenController) => {
  const controller = new HttpTokenController(new TokenService(new TokenRepository), new CRUDRepository())
  return (controller[method] as Function).bind(controller)
}