import express from "express"
import { tables } from "@s/core/domain/types"
import { formController, messageController, tokenController, universalController } from "@s/controllers"
const router = express.Router()

// const httpUserController = (method: keyof HttpUserController) => {
//   const controller = new HttpUserController(new UserService(new UserRepoImpl()), new UserRepoImpl())
//   //@ts-ignore
//   return controller[method].bind(controller)
// }



const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'data_res', 'tags', 'user_tags', 'tokens']

tablesArr.forEach(table => {
  router.get(`/${table}`, universalController('get', table))
  router.get(`/${table}/:id`, universalController('getById', table))
  // router.get(`/${table}`, universalController('getByParams', table))
  router.post(`/${table}`, universalController('post', table))
  router.put(`/${table}/:id`, universalController('put', table))
  router.delete(`/${table}/:id`, universalController('delete', table))
})

router.get('/byParams', universalController('getByParams', 'users'))

router.post('/registration', tokenController('registartion'))
router.post('/login', tokenController('login'))
router.get('/logout/:id', tokenController('logout'))
router.get('/refresh', tokenController('refresh'))

router.post('/createForm', formController("postForm"))

router.post('/sendMessage', messageController('sendMessage'))
router.put('/editMessage/:id', messageController('editMessage'))
router.delete('/deleteMessage/:id', messageController('deleteMessage'))

export default router