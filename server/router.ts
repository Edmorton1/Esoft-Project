import { CRUDController } from "@s/infrastructure/controllers/CRUDController"
import { CRUDRepository } from "@s/core/repositories/CRUDRepository"

import express from "express"
import { tables } from "@s/core/domain/types"
const router = express.Router()

// const httpUserController = (method: keyof HttpUserController) => {
//   const controller = new HttpUserController(new UserService(new UserRepoImpl()), new UserRepoImpl())
//   //@ts-ignore
//   return controller[method].bind(controller)
// }

const universalController = (method: keyof CRUDController, table: tables) => {
  const controller = new CRUDController(new CRUDRepository(), table)
  //@ts-ignore
  return controller[method].bind(controller)
}

const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'data_res', 'tags', 'user_tags']

tablesArr.forEach(table => {
  router.get(`/${table}`, universalController('get', table))
  router.post(`/${table}`, universalController('post', table))
  router.put(`/${table}/:id`, universalController('put', table))
  router.delete(`/${table}/:id`, universalController('delete', table))
})

export default router