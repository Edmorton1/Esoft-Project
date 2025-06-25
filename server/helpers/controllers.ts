import CRUDController from "@s/infrastructure/endpoints/CRUD/CRUDController"
import appBindingsContainer from "@s/config/containers/container.di"
import TYPES from "@s/config/containers/types"
import { tables } from "@t/gen/types"

export const universalController = (method: keyof CRUDController, table: tables) => {
  const controller = appBindingsContainer.get<CRUDController>(TYPES.CRUD.Tables[table])
  return (controller[method] as () => any).bind(controller)
}
