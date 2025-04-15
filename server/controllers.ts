import { CRUDController } from "@s/infrastructure/controllers/CRUDController"
import { ORM } from "@s/infrastructure/db/ORM"
import { TokenService } from "@s/infrastructure/services/TokenService"
import { HttpTokenController } from "@s/infrastructure/controllers/HttpTokenController"
import { tables } from "@s/core/domain/types"
import { HttpFormController } from "@s/infrastructure/controllers/HttpFormController"
import { FormService } from "@s/infrastructure/services/FormService"

export const universalController = (method: keyof CRUDController, table: tables) => {
  const controller = new CRUDController(new ORM(), table)
  return (controller[method] as Function).bind(controller)
}

export const tokenController = (method: keyof HttpTokenController) => {
  const controller = new HttpTokenController(new TokenService(), new ORM())
  return (controller[method] as Function).bind(controller)
}

export const formController = (method: keyof HttpFormController) => {
  const controller = new HttpFormController(new FormService(new ORM), new ORM())
  return (controller[method] as Function).bind(controller)
}