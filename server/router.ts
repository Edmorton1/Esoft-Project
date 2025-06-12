import express from "express"
import { tables } from "@t/gen/types"
import { universalController } from "@s/controllers"
import multer from "multer"
import { serverPaths } from "@shared/PATHS"
import HttpTokenController from "@s/infrastructure/endpoints/Token/HttpTokenController"
import HttpMessageController from "@s/infrastructure/endpoints/Message/HttpMessageController"
import HttpLikesController from "@s/infrastructure/endpoints/Likes/HttpLikesController"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import HttpExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/HttpExtendedSearchController"
import CRUDMiddleware from "@s/infrastructure/middlewares/CRUDMiddleware"
import logger, { httpLogger } from "@s/logger"
import RegistrationValidationMid from "@s/infrastructure/endpoints/Token/middlewares/RegistrationValidationMid"
import LikesMiddleware from "@s/infrastructure/endpoints/Likes/middlewares/LikesMiddleware"
import MessageMiddleware from "@s/infrastructure/endpoints/Message/middlewares/MessageMiddleware"
import HttpMessageOutsideController from "@s/infrastructure/endpoints/MessageOutside/HttpMessageOutsideController"
import SharedMiddlewares from "@s/infrastructure/middlewares/SharedMiddlewares"
import ExtendedSearchMiddle from "@s/infrastructure/endpoints/ExtendSearch/middlewares/ExtendedSearchMiddle"

const upload = multer({storage: multer.memoryStorage()})
const router = express.Router()

const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags', 'tokens']

router.use(httpLogger)

tablesArr.forEach(table => {
  router.get(`/${table}`, new CRUDMiddleware(table).CRUDshort, universalController('get', table))
  router.get(`/${table}/:id`, new CRUDMiddleware(table).CRUDshort, universalController('getById', table))
  // router.get(`/${table}`, universalController('getByParams', table))
  router.post(`/${table}`, new CRUDMiddleware(table).CRUDshort, universalController('post', table))
  router.put(`/${table}/:id`, new CRUDMiddleware(table).CRUDshort, universalController('put', table))
  router.delete(`/${table}/:id`, new CRUDMiddleware(table).CRUDshort, universalController('delete', table))
})

// router.get('/byParams', universalController('getByParams', 'users'))

router.get('/', (req, res) => {res.json('Работает'); logger.info('Работает')})

router.post(serverPaths.registration, upload.single('avatar'), RegistrationValidationMid, HttpTokenController.registartion)
router.post(serverPaths.login, HttpTokenController.login)
router.get(`${serverPaths.logout}/:id`, HttpTokenController.logout)
router.get(serverPaths.refresh, HttpTokenController.refresh)

// router.post(serverPaths.createForm, HttpFormController.postForm)

router.post(serverPaths.sendMessage, upload.array('files'), MessageMiddleware.sendMessage , HttpMessageController.sendMessage)
router.put(`${serverPaths.editMessage}/:id`, upload.array('files'), MessageMiddleware.editMessage, HttpMessageController.editMessage)
router.delete(`${serverPaths.deleteMessage}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpMessageController.deleteMessage)
router.get(`${serverPaths.getMessage}/:frid/:toid`, MessageMiddleware.getMessage, HttpMessageController.getMessage)

router.post(serverPaths.likesSend, LikesMiddleware.sendLike, HttpLikesController.sendLike)
router.delete(`${serverPaths.likesDelete}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpLikesController.sendDelete)
router.get(`${serverPaths.likesGet}/:id`, LikesMiddleware.likesGet, HttpLikesController.likesGet)

router.post(`${serverPaths.postAvatar}/:id`, upload.single('avatar'),  HttpFilesController.postAvatar)

router.post(serverPaths.testCompressViedo, upload.single('video'), HttpFilesController.TestConvertVideo)
router.post(serverPaths.testCompressAudio, upload.single('audio'), HttpFilesController.TestConvertAudio)

router.post(`${serverPaths.extendedSearch}`, ExtendedSearchMiddle, HttpExtendedSearchController.getForms)

router.get(`${serverPaths.outsideMessages}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpMessageOutsideController.outsideMessages)

// router.get('/dec', (req, res) => {
//   const body = req.body;
//   logger.info(body)
//   res.header('lang', 'ru-RU')
//   res.sendStatus(500)
// })

export default router