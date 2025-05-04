import { CRUDController } from "@s/infrastructure/controllers/CRUDController"
import { ORM } from "@s/infrastructure/db/requests/ORM"
import { TokenService } from "@s/infrastructure/services/TokenService"
import { HttpTokenController } from "@s/infrastructure/controllers/HttpTokenController"
import { tables } from "@s/core/domain/types"
import { HttpFormController } from "@s/infrastructure/controllers/HttpFormController"
import { FormService } from "@s/infrastructure/services/FormService"
import { HttpMessageController } from "@s/infrastructure/controllers/HttpMessageController"
import { HttpLikesController } from "@s/infrastructure/controllers/HttpLikesController"
import HttpFilesController from "./infrastructure/controllers/HttpFilesController"
import FileService from "./infrastructure/services/FileService"
import { MessageFileService } from "./infrastructure/services/MessageFileService"
import HttpHardController from "@s/infrastructure/controllers/HttpHardController"
import SQLHard from "@s/infrastructure/db/requests/SQLHard"

export const universalController = (method: keyof CRUDController, table: tables) => {
  const controller = new CRUDController(new ORM(), table)
  return (controller[method] as () => any).bind(controller)
}

export const tokenController = (method: keyof HttpTokenController) => {
  const controller = new HttpTokenController(new TokenService(new ORM), new ORM())
  return (controller[method] as () => any).bind(controller)
}

export const formController = (method: keyof HttpFormController) => {
  const controller = new HttpFormController(new FormService(new ORM), new ORM())
  return (controller[method] as () => any).bind(controller)
}

export const messageController = (method: keyof HttpMessageController) => {
  const controller = new HttpMessageController(new MessageFileService(new FileService), new ORM())
  return (controller[method] as () => any).bind(controller)
}

export const likesController = (method: keyof HttpLikesController) => {
  const controller = new HttpLikesController(new ORM)
  return (controller[method] as () => any).bind(controller)
}

export const filesController = (method: keyof HttpFilesController) => {
  const controller = new HttpFilesController(new FileService, new ORM)
  return (controller[method] as () => any).bind(controller)
}

export const hardController = (method: keyof HttpHardController) => {
  const controller = new HttpHardController(new SQLHard)
  return (controller[method] as () => any).bind(controller)
}