import express from "express"
import { tables } from "@s/core/domain/types"
import { universalController } from "@s/controllers"
import multer from "multer"
import { serverPaths } from "@shared/PATHS"
import HttpTokenController from "@s/infrastructure/endpoints/Token/HttpTokenController"
import HttpFormController from "@s/infrastructure/endpoints/Form/HttpFormController"
import HttpMessageController from "@s/infrastructure/endpoints/Message/HttpMessageController"
import HttpLikesController from "@s/infrastructure/endpoints/Likes/HttpLikesController"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import HttpExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/HttpExtendedSearchController"
const upload = multer({storage: multer.memoryStorage()})
const router = express.Router()

const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags', 'tokens']

tablesArr.forEach(table => {
  router.get(`/${table}`, universalController('get', table))
  router.get(`/${table}/:id`, universalController('getById', table))
  // router.get(`/${table}`, universalController('getByParams', table))
  router.post(`/${table}`, universalController('post', table))
  router.put(`/${table}/:id`, universalController('put', table))
  router.delete(`/${table}/:id`, universalController('delete', table))
})

// router.get('/byParams', universalController('getByParams', 'users'))

router.post(serverPaths.registration, HttpTokenController.registartion)
router.post(serverPaths.login, HttpTokenController.login)
router.get(`${serverPaths.logout}/:id`, HttpTokenController.logout)
router.get(serverPaths.refresh, HttpTokenController.refresh)

router.post(serverPaths.createForm, HttpFormController.postForm)

router.post(serverPaths.sendMessage, upload.array('files'), HttpMessageController.sendMessage)
router.put(`${serverPaths.editMessage}/:id`, upload.array('files'), HttpMessageController.editMessage)
router.delete(`${serverPaths.deleteMessage}/:id`, HttpMessageController.deleteMessage)

router.post(serverPaths.likesGet, HttpLikesController.sendLike)
router.delete(`${serverPaths.likesDelete}/:id`, HttpLikesController.sendDelete)

router.post(`${serverPaths.postAvatar}/:id`, upload.single('avatar'),  HttpFilesController.postAvatar)

router.post(serverPaths.testCompressViedo, upload.single('video'), HttpFilesController.TestConvertVideo)
router.post(serverPaths.testCompressAudio, upload.single('audio'), HttpFilesController.TestConvertAudio)

router.get(`${serverPaths.extendedSearch}`, HttpExtendedSearchController.getForms)

export default router