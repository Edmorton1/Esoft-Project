import {Router} from "express";
import { universalController } from "@s/helpers/controllers"
import { serverPaths } from "@shared/PATHS"
import HttpAuthController from "@s/infrastructure/endpoints/Auth/HttpAuthController"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import HttpExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/HttpExtendedSearchController"
// import CRUDMiddleware from "@s/infrastructure/middlewares/CRUDMiddleware"
import logger from "@s/helpers/logger"
import AuthoMid from "@s/infrastructure/endpoints/Auth/middlewares/AuthoMid"
import ExtendedSearchMiddle from "@s/infrastructure/endpoints/ExtendSearch/middlewares/ExtendedSearchMiddle"
import FormMiddlewares from "@s/infrastructure/endpoints/Form/middlewares/FormMiddlewares"
import HttpFormController from "@s/infrastructure/endpoints/Form/HttpFormController"
import { tables } from "@t/gen/types";
import multer from "multer";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import { asyncHandle } from "@s/routes/utils";

export const upload = multer({storage: multer.memoryStorage()})

const publicRouter = Router();

const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags']

// CRUD ЗАПРОСЫ
tablesArr.forEach(table => {
  publicRouter.get(`/${table}`, asyncHandle(universalController('get', table)))
  publicRouter.get(`/${table}/:id`, asyncHandle(universalController('getById', table)))
  publicRouter.post(`/${table}`, asyncHandle(universalController('post', table)))
  publicRouter.put(`/${table}/:id`, asyncHandle(universalController('put', table)))
  publicRouter.delete(`/${table}/:id`, AuthMiddleware.OnlyAuth, asyncHandle(universalController('delete', table)))
})
// СТАНДАРТНЫЙ ЗАПРОС
publicRouter.get('/', (req, res) => {logger.info('Работает'); res.sendStatus(200)})
// АВТОРИЗАЦИЯ
publicRouter.post(serverPaths.registration, upload.single('avatar'), AuthoMid.registration, asyncHandle(HttpAuthController.registartion))
publicRouter.post(serverPaths.login, AuthoMid.login, asyncHandle(HttpAuthController.login))
publicRouter.get(serverPaths.initial, asyncHandle(HttpAuthController.initial))

// РАСШИРЕННЫЙ ПОИСК
publicRouter.get(`${serverPaths.extendedSearch}`, ExtendedSearchMiddle, asyncHandle(HttpExtendedSearchController.getForms))
// ПОИСК ПОЛЬЗОВАТЕЛЕЙ
publicRouter.get(`${serverPaths.searchForm}/:search`, FormMiddlewares.searchForm, asyncHandle(HttpFormController.searchForm))
// ТЕСТ КОМПРЕССИИ
publicRouter.post(serverPaths.testCompressViedo, upload.single('video'), asyncHandle(HttpFilesController.TestConvertVideo))
publicRouter.post(serverPaths.testCompressAudio, upload.single('audio'), asyncHandle(HttpFilesController.TestConvertAudio))

export default publicRouter;
