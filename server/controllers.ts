import CRUDController from "@s/infrastructure/endpoints/CRUD/CRUDController"
import ORM  from "@s/infrastructure/db/requests/ORM"
import TokenService from "@s/infrastructure/endpoints/Token/services/TokenService"
import { tables } from "@s/core/domain/types"
import FormService from "@s/infrastructure/endpoints/Form/services/FormService"
import HttpFilesController from "./infrastructure/endpoints/Files/HttpFilesController"
import FileService from "./infrastructure/endpoints/Files/services/FileService"
import HttpExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/HttpExtendedSearchController"
import SQLHard from "@s/infrastructure/endpoints/ExtendSearch/sql/SQLHard"
import MessageFileService from "@s/infrastructure/endpoints/Message/services/MessageFileService"

export const universalController = (method: keyof CRUDController, table: tables) => {
  const controller = new CRUDController(table)
  return (controller[method] as () => any).bind(controller)
}

// export const tokenController = (method: keyof HttpTokenController) => {
//   const controller = new HttpTokenController()
//   return (controller[method] as () => any).bind(controller)
// }

// export const formController = (method: keyof HttpFormController) => {
//   const controller = new HttpFormController()
//   return (controller[method] as () => any).bind(controller)
// }

// export const messageController = (method: keyof HttpMessageController) => {
//   const controller = new HttpMessageController()
//   return (controller[method] as () => any).bind(controller)
// }

// export const likesController = (method: keyof HttpLikesController) => {
//   const controller = new HttpLikesController()
//   return (controller[method] as () => any).bind(controller)
// }

// export const filesController = (method: keyof HttpFilesController) => {
//   const controller = new HttpFilesController()
//   return (controller[method] as () => any).bind(controller)
// }

// export const hardController = (method: keyof HttpHardController) => {
//   const controller = new HttpHardController(new SQLHard)
//   return (controller[method] as () => any).bind(controller)
// }