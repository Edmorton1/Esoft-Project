import {Router} from "express";
import { universalController } from "@s/helpers/controllers"
import { serverPaths } from "@shared/PATHS"
import AuthController from "@s/infrastructure/endpoints/Auth/Auth.controller"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import ExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller"
// import CRUDMiddleware from "@s/infrastructure/middlewares/CRUDMiddleware"
import logger from "@s/helpers/logger"
import ExtendedSearchValidation from "@s/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.validation"
import FormValidation from "@s/infrastructure/endpoints/Form/validation/Form.validation"
import FormController from "@s/infrastructure/endpoints/Form/Form.controller"
import multer from "multer";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import { asyncHandle } from "@s/routes/utils";
import container, { tablesArr } from "@s/routes/containers/container.di";

export const upload = multer({storage: multer.memoryStorage()})

const publicRouter = Router();

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
publicRouter.post(serverPaths.registration, upload.single('avatar'), asyncHandle(container.get(AuthController).registartion))
publicRouter.post(serverPaths.login, asyncHandle(container.get(AuthController).login))
publicRouter.get(serverPaths.initial, asyncHandle(container.get(AuthController).initial))

// РАСШИРЕННЫЙ ПОИСК
publicRouter.get(`${serverPaths.extendedSearch}`, asyncHandle(container.get(ExtendedSearchController).getForms))
// ПОИСК ПОЛЬЗОВАТЕЛЕЙ
publicRouter.get(`${serverPaths.searchForm}/:search`, asyncHandle(container.get(FormController).searchForm))

// ТЕСТ КОМПРЕССИИ НЕ УДАЛЯТЬ
// publicRouter.post(serverPaths.testCompressViedo, upload.single('video'), asyncHandle(HttpFilesController.TestConvertVideo))
// publicRouter.post(serverPaths.testCompressAudio, upload.single('audio'), asyncHandle(HttpFilesController.TestConvertAudio))

export default publicRouter;
