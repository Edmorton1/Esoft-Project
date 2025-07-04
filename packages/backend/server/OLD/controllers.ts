// import CRUDController from "@app/server/infrastructure/endpoints/CRUD/CRUDController"
// import appBindingsContainer from "@app/server/config/containers/container.di"
// import TYPES from "@app/server/config/containers/types"
// import { tables } from "@app/types/gen/types"

// export const universalController = (method: keyof CRUDController, table: tables) => {
//   const controller = appBindingsContainer.get<CRUDController>(TYPES.CRUD.Controllers[table])
//   return (controller[method] as () => any).bind(controller)
// }
