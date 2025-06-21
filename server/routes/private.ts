import {Router} from "express";
import { serverPaths } from "@shared/PATHS"
import HttpAuthController from "@s/infrastructure/endpoints/Auth/HttpAuthController"
import HttpMessageController from "@s/infrastructure/endpoints/Messages/HttpMessageController"
import HttpLikesController from "@s/infrastructure/endpoints/Likes/HttpLikesController"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import LikesMiddleware from "@s/infrastructure/endpoints/Likes/middlewares/LikesMiddleware"
import MessageMiddleware from "@s/infrastructure/endpoints/Messages/middlewares/MessageMiddleware"
import HttpMessageOutsideController from "@s/infrastructure/endpoints/MessageOutside/HttpMessageOutsideController"
import SharedMiddlewares from "@s/infrastructure/middlewares/SharedMiddlewares"
import HelpersMiddlewares from "@s/infrastructure/endpoints/Helpers/middlewares/HelpersMiddlewares"
import HttpHelpers from "@s/infrastructure/endpoints/Helpers/HttpHelpers"
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware"
import { upload } from "@s/routes/public";

const privateRouter = Router();

// privateRouter.use(AuthMiddleware.OnlyAuth)
//ЛОГАУТ
privateRouter.post(serverPaths.logout, HttpAuthController.logout)
// СООБЩЕНИЯ
privateRouter.post(serverPaths.sendMessage, upload.array('files'), AuthMiddleware.OnlyAuth, MessageMiddleware.sendMessage , HttpMessageController.sendMessage)
privateRouter.put(`${serverPaths.editMessage}/:id`, upload.array('files'), AuthMiddleware.OnlyAuth, MessageMiddleware.editMessage, HttpMessageController.editMessage)
privateRouter.delete(`${serverPaths.deleteMessage}/:id`, AuthMiddleware.OnlyAuth, SharedMiddlewares.OnlyIdMiddleware, HttpMessageController.deleteMessage)
privateRouter.get(`${serverPaths.getMessage}/:toid`, AuthMiddleware.OnlyAuth, MessageMiddleware.getMessage, HttpMessageController.getMessage)
// ЗАПРОС ПЕРЕПИСОК
privateRouter.get(serverPaths.outsideMessages, AuthMiddleware.OnlyAuth, HttpMessageOutsideController.outsideMessages)
// ЛАЙКИ
privateRouter.post(serverPaths.likesSend, AuthMiddleware.OnlyAuth, LikesMiddleware.sendLike, HttpLikesController.sendLike)
privateRouter.delete(`${serverPaths.likesDelete}/:id`, AuthMiddleware.OnlyAuth, SharedMiddlewares.OnlyIdMiddleware, HttpLikesController.sendDelete)
privateRouter.get(serverPaths.likesGet, AuthMiddleware.OnlyAuth, LikesMiddleware.likesGet, HttpLikesController.likesGet)
// СМЕНА АВАТАРА
// ПОФИКСИТЬ НА КЛИЕНТЕ
privateRouter.post(serverPaths.postAvatar, upload.single('avatar'), AuthMiddleware.OnlyAuth, HttpFilesController.postAvatar)
// ИЗМЕНЕНИЕ ПРОФИЛЯ
// ТУТ ВСЁ ТОЖЕ ПОФИКСИТЬ НА КЛИЕНТЕ
privateRouter.post(serverPaths.passwordCompare, AuthMiddleware.OnlyAuth, HelpersMiddlewares.passwordMiddleware, HttpHelpers.passwordCompare)
privateRouter.put(serverPaths.profilePut, AuthMiddleware.OnlyAuth, HelpersMiddlewares.profileMiddleware, HttpHelpers.profilePut)

export default privateRouter;
