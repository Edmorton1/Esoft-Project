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
import { asyncHandle } from "@s/routes/utils";

const privateRouter = Router();

// privateRouter.use(AuthMiddleware.OnlyAuth)
//ЛОГАУТ
privateRouter.post(serverPaths.logout, HttpAuthController.logout)
// СООБЩЕНИЯ
privateRouter.post(`${serverPaths.sendMessage}/:toid`, upload.array('files'), AuthMiddleware.OnlyAuth, MessageMiddleware.sendMessage , asyncHandle(HttpMessageController.sendMessage))
privateRouter.put(`${serverPaths.editMessage}/:id`, upload.array('files'), AuthMiddleware.OnlyAuth, MessageMiddleware.editMessage, asyncHandle(HttpMessageController.editMessage))
privateRouter.delete(`${serverPaths.deleteMessage}/:id`, AuthMiddleware.OnlyAuth, SharedMiddlewares.OnlyIdMiddleware, asyncHandle(HttpMessageController.deleteMessage))
privateRouter.get(`${serverPaths.getMessage}/:toid`, AuthMiddleware.OnlyAuth, MessageMiddleware.getMessage, asyncHandle(HttpMessageController.getMessage))
// ЗАПРОС ПЕРЕПИСОК
privateRouter.get(serverPaths.outsideMessages, AuthMiddleware.OnlyAuth, asyncHandle(HttpMessageOutsideController.outsideMessages))
// ЛАЙКИ
privateRouter.post(`${serverPaths.likesSend}/:liked_userid`, AuthMiddleware.OnlyAuth, LikesMiddleware.sendLike, asyncHandle(HttpLikesController.sendLike))
privateRouter.delete(`${serverPaths.likesDelete}/:id`, AuthMiddleware.OnlyAuth, SharedMiddlewares.OnlyIdMiddleware, asyncHandle(HttpLikesController.sendDelete))
privateRouter.get(serverPaths.likesGet, AuthMiddleware.OnlyAuth, LikesMiddleware.likesGet, asyncHandle(HttpLikesController.likesGet))
// СМЕНА АВАТАРА
privateRouter.post(serverPaths.postAvatar, upload.single('avatar'), AuthMiddleware.OnlyAuth, asyncHandle(HttpFilesController.postAvatar))
// ИЗМЕНЕНИЕ ПРОФИЛЯ
privateRouter.post(serverPaths.passwordCompare, AuthMiddleware.OnlyAuth, HelpersMiddlewares.passwordMiddleware, asyncHandle(HttpHelpers.passwordCompare))
privateRouter.put(serverPaths.profilePut, AuthMiddleware.OnlyAuth, HelpersMiddlewares.profileMiddleware, asyncHandle(HttpHelpers.profilePut))

export default privateRouter;
