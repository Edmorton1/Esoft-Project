import CRUDController from "@s/infrastructure/endpoints/CRUD/CRUDController"
import { tables } from "@t/gen/types"

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