import express from "express"
import { tables } from "@t/gen/types"
import { universalController } from "@s/helpers/controllers"
import multer from "multer"
import { serverPaths } from "@shared/PATHS"
import HttpAuthController from "@s/infrastructure/endpoints/Auth/HttpAuthController"
import HttpMessageController from "@s/infrastructure/endpoints/Messages/HttpMessageController"
import HttpLikesController from "@s/infrastructure/endpoints/Likes/HttpLikesController"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import HttpExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/HttpExtendedSearchController"
// import CRUDMiddleware from "@s/infrastructure/middlewares/CRUDMiddleware"
import logger, { httpLogger } from "@s/helpers/logger"
import AuthoMid from "@s/infrastructure/endpoints/Auth/middlewares/AuthoMid"
import LikesMiddleware from "@s/infrastructure/endpoints/Likes/middlewares/LikesMiddleware"
import MessageMiddleware from "@s/infrastructure/endpoints/Messages/middlewares/MessageMiddleware"
import HttpMessageOutsideController from "@s/infrastructure/endpoints/MessageOutside/HttpMessageOutsideController"
import SharedMiddlewares from "@s/infrastructure/middlewares/SharedMiddlewares"
import ExtendedSearchMiddle from "@s/infrastructure/endpoints/ExtendSearch/middlewares/ExtendedSearchMiddle"
import HelpersMiddlewares from "@s/infrastructure/endpoints/Helpers/middlewares/HelpersMiddlewares"
import HttpHelpers from "@s/infrastructure/endpoints/Helpers/HttpHelpers"
import FormMiddlewares from "@s/infrastructure/endpoints/Form/middlewares/FormMiddlewares"
import HttpFormController from "@s/infrastructure/endpoints/Form/HttpFormController"
import session from "express-session"
import dotenv from "dotenv"
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware"
import { redisStore } from "@s/infrastructure/redis/redis"
import { COOKIE_NAME } from "@shared/CONST"
dotenv.config()

const upload = multer({storage: multer.memoryStorage()})
const router = express.Router()

const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags']

router.use(httpLogger)

router.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  name: COOKIE_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 600000000
  },
  // rolling: true
}))

// CRUD ЗАПРОСЫ
tablesArr.forEach(table => {
  router.get(`/${table}`, universalController('get', table))
  router.get(`/${table}/:id`, universalController('getById', table))
  // router.get(`/${table}`, universalController('getByParams', table))
  router.post(`/${table}`, universalController('post', table))
  router.put(`/${table}/:id`, universalController('put', table))
  router.delete(`/${table}/:id`, universalController('delete', table))
})
// СТАНДАРТНЫЙ ЗАПРОС
router.get('/', (req, res) => {logger.info('Работает'); res.sendStatus(200)})
// АВТОРИЗАЦИЯ
router.post(serverPaths.registration, upload.single('avatar'), AuthoMid.registration, HttpAuthController.registartion)
router.post(serverPaths.login, AuthoMid.login, HttpAuthController.login)
router.get(serverPaths.initial, HttpAuthController.initial)

// РАСШИРЕННЫЙ ПОИСК
router.get(`${serverPaths.extendedSearch}`, ExtendedSearchMiddle, HttpExtendedSearchController.getForms)
// ПОИСК ПОЛЬЗОВАТЕЛЕЙ
router.get(`${serverPaths.searchForm}/:search`, FormMiddlewares.searchForm, HttpFormController.searchForm)
// ТЕСТ КОМПРЕССИИ
router.post(serverPaths.testCompressViedo, upload.single('video'), HttpFilesController.TestConvertVideo)
router.post(serverPaths.testCompressAudio, upload.single('audio'), HttpFilesController.TestConvertAudio)

// ------------------------------------------ ДАЛЬШЕ ВСЕ ЗАПРОСЫ С ПРОВЕРКОЙ АВТОРИЗАЦИИ -------------------------------------------
router.use(AuthMiddleware.OnlyAuth)
//ЛОГАУТ
router.post(serverPaths.logout, HttpAuthController.logout)
// СООБЩЕНИЯ
router.post(serverPaths.sendMessage, upload.array('files'), MessageMiddleware.sendMessage , HttpMessageController.sendMessage)
router.put(`${serverPaths.editMessage}/:id`, upload.array('files'), MessageMiddleware.editMessage, HttpMessageController.editMessage)
router.delete(`${serverPaths.deleteMessage}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpMessageController.deleteMessage)
router.get(`${serverPaths.getMessage}/:frid/:toid`, MessageMiddleware.getMessage, HttpMessageController.getMessage)
// ЗАПРОС ПЕРЕПИСОК
router.get(`${serverPaths.outsideMessages}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpMessageOutsideController.outsideMessages)
// ЛАЙКИ
router.post(serverPaths.likesSend, LikesMiddleware.sendLike, HttpLikesController.sendLike)
router.delete(`${serverPaths.likesDelete}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpLikesController.sendDelete)
router.get(`${serverPaths.likesGet}/:id`, LikesMiddleware.likesGet, HttpLikesController.likesGet)
// СМЕНА АВАТАРА
router.post(`${serverPaths.postAvatar}/:id`, upload.single('avatar'),  HttpFilesController.postAvatar)
// ИЗМЕНЕНИЕ ПРОФИЛЯ
router.post(`${serverPaths.passwordCompare}/:id`, HelpersMiddlewares.passwordMiddleware, HttpHelpers.passwordCompare)
router.put(`${serverPaths.profilePut}/:id`, HelpersMiddlewares.profileMiddleware, HttpHelpers.profilePut)
// ------------------------------------------ ДОСТУПНЫ ТОЛЬКО АДМИНИСТРАТОРУ -------------------------------------------
router.use(AuthMiddleware.OnlyAdmin)

export default router
















// router.post(serverPaths.createForm, HttpFormController.postForm)

// router.get(serverPaths.refresh, HttpTokenController.refresh)

// router.get('/byParams', universalController('getByParams', 'users'))

// router.get("/test", AuthMiddleware.OnlyAuth, async (req, res) => {
//   // console.log(req.id)
//   res.json(req.userid)
// })

// router.get('/dec', (req, res) => {
//   const body = req.body;
//   logger.info(body)
//   res.header('lang', 'ru-RU')
//   res.sendStatus(500)
// })
// router.post(serverPaths.sendMessage, upload.array('files'), MessageMiddleware.sendMessage , HttpMessageController.sendMessage)
// router.put(`${serverPaths.editMessage}/:id`, upload.array('files'), MessageMiddleware.editMessage, HttpMessageController.editMessage)
// router.delete(`${serverPaths.deleteMessage}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpMessageController.deleteMessage)
// router.get(`${serverPaths.getMessage}/:frid/:toid`, MessageMiddleware.getMessage, HttpMessageController.getMessage)