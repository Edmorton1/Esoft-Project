import express from "express"
import { tables } from "@t/gen/types"
import { universalController } from "@s/controllers"
import multer from "multer"
import { serverPaths } from "@shared/PATHS"
import HttpTokenController from "@s/infrastructure/endpoints/Token/HttpTokenController"
// import HttpFormController from "@s/infrastructure/endpoints/Form/HttpFormController"
import HttpMessageController from "@s/infrastructure/endpoints/Message/HttpMessageController"
import HttpLikesController from "@s/infrastructure/endpoints/Likes/HttpLikesController"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import HttpExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/HttpExtendedSearchController"
import CRUDMiddleware from "@s/infrastructure/middlewares/CRUDMiddleware"
import { db } from "@s/infrastructure/db/db"
import ORM from "@s/infrastructure/db/requests/ORM"

const upload = multer({storage: multer.memoryStorage()})
const router = express.Router()

const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags', 'tokens']

tablesArr.forEach(table => {
  router.get(`/${table}`, new CRUDMiddleware(table).CRUDshort, universalController('get', table))
  router.get(`/${table}/:id`, new CRUDMiddleware(table).CRUDshort, universalController('getById', table))
  // router.get(`/${table}`, universalController('getByParams', table))
  router.post(`/${table}`, new CRUDMiddleware(table).CRUDshort, universalController('post', table))
  router.put(`/${table}/:id`, new CRUDMiddleware(table).CRUDshort, universalController('put', table))
  router.delete(`/${table}/:id`, new CRUDMiddleware(table).CRUDshort, universalController('delete', table))
})

// router.get('/byParams', universalController('getByParams', 'users'))

router.get('/', (req, res) => {res.json('Работает'); console.log('Работает')})
router.post(serverPaths.registration, upload.single('avatar'), HttpTokenController.registartion)
router.post(serverPaths.login, HttpTokenController.login)
router.get(`${serverPaths.logout}/:id`, HttpTokenController.logout)
router.get(serverPaths.refresh, HttpTokenController.refresh)

// router.post(serverPaths.createForm, HttpFormController.postForm)

router.post(serverPaths.sendMessage, upload.array('files'), HttpMessageController.sendMessage)
router.put(`${serverPaths.editMessage}/:id`, upload.array('files'), HttpMessageController.editMessage)
router.delete(`${serverPaths.deleteMessage}/:id`, HttpMessageController.deleteMessage)

router.post(serverPaths.likesGet, HttpLikesController.sendLike)
router.delete(`${serverPaths.likesDelete}/:id`, HttpLikesController.sendDelete)

router.post(`${serverPaths.postAvatar}/:id`, upload.single('avatar'),  HttpFilesController.postAvatar)

router.post(serverPaths.testCompressViedo, upload.single('video'), HttpFilesController.TestConvertVideo)
router.post(serverPaths.testCompressAudio, upload.single('audio'), HttpFilesController.TestConvertAudio)

router.get(`${serverPaths.extendedSearch}`, HttpExtendedSearchController.getForms)

router.get(`/knex`, async (req, res) => {
  // const rres = db('forms')
  //   .select('forms.*', db.raw(`json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags`))
  //   .leftJoin('user_tags', 'forms.id', 'user_tags.id')
  //   .leftJoin('tags', 'forms.id', 'user_tags.tagid')
  //   .groupBy('forms.id')
  const rres = await db('users')
    .insert({
      email: "laria@mail.ru",
      password: "123",
      role: "user",
    })
    .returning('*')
    // .where({id: 51, role: "user"})
  // const SQL = rres.toSQL()
  // console.log(SQL.sql)
  res.json(rres)
})

router.post('/goi', async (req, res) => {
  // const onConflict = onConflictDoNothing ? 'ON CONFLICT DO NOTHING' : 'ON CONFLICT (tag) DO UPDATE SET tag = EXCLUDED.tag'
  // //@ts-ignore
  // const [answer, keys, values] = typeof dto[0] === 'object' ? toSQLArrayObj(dto) : toSQLArray(dto, table === 'tags' ? 'tag' : table)
  // console.log({answer, keys, values})
  // console.log(`INSERT INTO ${table} (${keys}) VALUES ${answer} ${onConflict} RETURNING ${fieldsSelect(fields)}`, [...values])

  // const request =  await pool.query(`INSERT INTO ${table} (${keys}) VALUES ${answer} ${onConflict} RETURNING ${fieldsSelect(fields)}`)
  const tags = [{tag: 'dmcx'}, {tag: 'eretrs'}, {tag: 'fdhjg'}]
  const user_tags = [{id: 183, tagid: 502}, {id: 183, tagid: 503}, {id: 183, tagid: 504}]
  const request = await ORM.postArr(tags, 'tags')
  const request2 = await ORM.postArr(user_tags, 'user_tags')


  // Завтра дописать запросы на knex, порешать с формами

  return res.json(request)
})

export default router