import { CRUDController } from "@s/infrastructure/controllers/CRUDController"
import { ORM } from "@s/core/repositories/ORM"
import { TokenRepository } from "@s/core/repositories/TokensRepository"
import { TokenService } from "@s/core/services/TokenService"
import { HttpTokenController } from "@s/infrastructure/controllers/HttpTokenController"
import { tables } from "@s/core/domain/types"

export const universalController = (method: keyof CRUDController, table: tables) => {
  const controller = new CRUDController(new ORM(), table)
  return (controller[method] as Function).bind(controller)
}

export const tokenController = (method: keyof HttpTokenController) => {
  const controller = new HttpTokenController(new TokenService(new TokenRepository), new ORM())
  return (controller[method] as Function).bind(controller)
}