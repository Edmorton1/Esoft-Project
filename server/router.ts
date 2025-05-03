import express from "express"
import { tables } from "@s/core/domain/types"
import { filesController, formController, likesController, messageController, tokenController, universalController } from "@s/controllers"
import multer from "multer"
import { serverPaths } from "@shared/PATHS"
const upload = multer({storage: multer.memoryStorage()})
const router = express.Router()

// const httpUserController = (method: keyof HttpUserController) => {
//   const controller = new HttpUserController(new UserService(new UserRepoImpl()), new UserRepoImpl())
//   //@ts-ignore
//   return controller[method].bind(controller)
// }



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

router.post(serverPaths.registration, tokenController('registartion'))
router.post(serverPaths.login, tokenController('login'))
router.get(`${serverPaths.logout}/:id`, tokenController('logout'))
router.get(serverPaths.refresh, tokenController('refresh'))

router.post(serverPaths.createForm, formController("postForm"))

router.post(serverPaths.sendMessage, upload.array('files'), messageController('sendMessage'))
router.put(`${serverPaths.editMessage}/:id`, upload.array('files'), messageController('editMessage'))
router.delete(`${serverPaths.deleteMessage}/:id`, messageController('deleteMessage'))

router.post(serverPaths.likesGet, likesController('sendLike'))
router.delete(`${serverPaths.likesDelete}/:id`, likesController('sendDelete'))

router.post(`${serverPaths.postAvatar}/:id`, upload.single('avatar'),  filesController('postAvatar'))

router.post(serverPaths.testCompressViedo, upload.single('video'), filesController('TestConvertVideo'))
router.post(serverPaths.testCompressAudio, upload.single('audio'), filesController('TestConvertAudio'))

export default router