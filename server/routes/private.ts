import {Router} from "express";
import { serverPaths } from "@shared/PATHS"
import AuthController from "@s/infrastructure/endpoints/Auth/Auth.controller"
import HttpMessageController from "@s/infrastructure/endpoints/Messages/HttpMessageController"
import LikesController from "@s/infrastructure/endpoints/Likes/Likes.controller"
import MessageMiddleware from "@s/infrastructure/endpoints/Messages/middlewares/MessageMiddleware"
import HttpMessageOutsideController from "@s/infrastructure/endpoints/MessageOutside/HttpMessageOutsideController"
import SharedMiddlewares from "@s/infrastructure/middlewares/SharedMiddlewares"
import SettingsController from "@s/infrastructure/endpoints/Settings/Settings.controller"
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware"
import { upload } from "@s/routes/public";
import { asyncHandle } from "@s/routes/utils";
import container from "@s/routes/containers/container.di";

const privateRouter = Router();

// privateRouter.use(AuthMiddleware.OnlyAuth)
//ЛОГАУТ
privateRouter.post(serverPaths.logout, container.get(AuthController).login)
// СООБЩЕНИЯ
privateRouter.post(`${serverPaths.sendMessage}/:toid`, upload.array('files'), AuthMiddleware.OnlyAuth, MessageMiddleware.sendMessage , asyncHandle(HttpMessageController.sendMessage))
privateRouter.put(`${serverPaths.editMessage}/:id`, upload.array('files'), AuthMiddleware.OnlyAuth, MessageMiddleware.editMessage, asyncHandle(HttpMessageController.editMessage))
privateRouter.delete(`${serverPaths.deleteMessage}/:id`, AuthMiddleware.OnlyAuth, SharedMiddlewares.OnlyIdMiddleware, asyncHandle(HttpMessageController.deleteMessage))
privateRouter.get(`${serverPaths.getMessage}/:toid`, AuthMiddleware.OnlyAuth, MessageMiddleware.getMessage, asyncHandle(HttpMessageController.getMessage))
// ЗАПРОС ПЕРЕПИСОК
privateRouter.get(serverPaths.outsideMessages, AuthMiddleware.OnlyAuth, asyncHandle(HttpMessageOutsideController.outsideMessages))
// ЛАЙКИ
privateRouter.post(`${serverPaths.likesSend}/:liked_userid`, AuthMiddleware.OnlyAuth, asyncHandle(container.get(LikesController).sendLike))
privateRouter.delete(`${serverPaths.likesDelete}/:id`, AuthMiddleware.OnlyAuth, SharedMiddlewares.OnlyIdMiddleware, asyncHandle(container.get(LikesController).sendDelete))
privateRouter.get(serverPaths.likesGet, AuthMiddleware.OnlyAuth, asyncHandle(container.get(LikesController).likesGet))
// ИЗМЕНЕНИЕ ПРОФИЛЯ
privateRouter.post(serverPaths.passwordCompare, AuthMiddleware.OnlyAuth, asyncHandle(container.get(SettingsController).passwordCompare))
privateRouter.put(serverPaths.profilePut, AuthMiddleware.OnlyAuth, asyncHandle(container.get(SettingsController).profilePut))
// СМЕНА АВАТАРА
privateRouter.post(serverPaths.postAvatar, upload.single('avatar'), AuthMiddleware.OnlyAuth, asyncHandle(container.get(SettingsController).postAvatar))

export default privateRouter;
