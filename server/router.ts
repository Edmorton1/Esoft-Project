import express from "express"
import { tables } from "@s/core/domain/types"
import { filesController, formController, likesController, messageController, tokenController, universalController } from "@s/controllers"
import multer from "multer"
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

router.post('/registration', tokenController('registartion'))
router.post('/login', tokenController('login'))
router.get('/logout/:id', tokenController('logout'))
router.get('/refresh', tokenController('refresh'))

router.post('/createForm', formController("postForm"))

router.post('/sendMessage', upload.array('files'), messageController('sendMessage'))
router.put('/editMessage/:id', messageController('editMessage'))
router.delete('/deleteMessage/:id', messageController('deleteMessage'))

router.post('/likesGet', likesController('sendLike'))
router.delete('/likesDelete/:id', likesController('sendDelete'))

router.post('/postAvatar/:id', upload.single('avatar'),  filesController('postAvatar'))

router.post('/testCompressViedo', upload.single('video'), filesController('TestConvertVideo'))

export default router