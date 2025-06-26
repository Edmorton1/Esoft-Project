import {Router} from "express";
import { serverPaths } from "@shared/PATHS"
import AuthController from "@s/infrastructure/endpoints/Auth/Auth.controller"
import MessagesController from "@s/infrastructure/endpoints/Messages/Messages.controller"
import LikesController from "@s/infrastructure/endpoints/Likes/Likes.controller"
import MessagesValidation from "@s/infrastructure/endpoints/Messages/validation/Message.validation"
import MessagesOutController from "@s/infrastructure/endpoints/MessageOutside/MessagesOut.controller"
import SharedValidate from "@s/infrastructure/middlewares/SharedValidate"
import SettingsController from "@s/infrastructure/endpoints/Settings/Settings.controller"
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware"
import { asyncHandle } from "@s/adapters/Express.adapter";
import appBindingsContainer from "@s/config/containers/container.di";
import { upload } from "@s/infrastructure/endpoints/multer";

const privateRouter = Router();

// privateRouter.use(AuthMiddleware.OnlyAuth)
//ЛОГАУТ
privateRouter.post(serverPaths.logout, appBindingsContainer.get(AuthController).login)
// СООБЩЕНИЯ
privateRouter.post(`${serverPaths.sendMessage}/:toid`, upload.array('files'), AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(MessagesController).sendMessage))
privateRouter.put(`${serverPaths.editMessage}/:id`, upload.array('files'), AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(MessagesController).editMessage))
privateRouter.delete(`${serverPaths.deleteMessage}/:id`, AuthMiddleware.OnlyAuth, SharedValidate.OnlyId, asyncHandle(appBindingsContainer.get(MessagesController).deleteMessage))
privateRouter.get(`${serverPaths.getMessage}/:toid`, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(MessagesController).getMessage))
// ЗАПРОС ПЕРЕПИСОК
privateRouter.get(serverPaths.outsideMessages, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(MessagesOutController).outsideMessages))
// ЛАЙКИ
privateRouter.post(`${serverPaths.likesSend}/:liked_userid`, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(LikesController).sendLike))
privateRouter.delete(`${serverPaths.likesDelete}/:id`, AuthMiddleware.OnlyAuth, SharedValidate.OnlyId, asyncHandle(appBindingsContainer.get(LikesController).sendDelete))
privateRouter.get(serverPaths.likesGet, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(LikesController).likesGet))
privateRouter.get(serverPaths.likesPairs, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(LikesController).getPairs))
privateRouter.delete(`${serverPaths.rejectLike}/:liked_userid`, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(LikesController).rejectLike))
// ИЗМЕНЕНИЕ ПРОФИЛЯ
privateRouter.post(serverPaths.passwordCompare, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(SettingsController).passwordCompare))
privateRouter.put(serverPaths.profilePut, AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(SettingsController).profilePut))
// СМЕНА АВАТАРА
privateRouter.post(serverPaths.postAvatar, upload.single('avatar'), AuthMiddleware.OnlyAuth, asyncHandle(appBindingsContainer.get(SettingsController).postAvatar))

export default privateRouter;
