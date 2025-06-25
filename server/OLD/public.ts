import {Router} from "express";
import { universalController } from "@s/helpers/controllers"
import { serverPaths } from "@shared/PATHS"
import AuthController from "@s/infrastructure/endpoints/Auth/Auth.controller"
import HttpFilesController from "@s/infrastructure/endpoints/Files/HttpFilesController"
import ExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller"
// import CRUDMiddleware from "@s/infrastructure/middlewares/CRUDMiddleware"
import logger from "@s/helpers/logger"
import FormController from "@s/infrastructure/endpoints/Form/Form.controller"
import multer from "multer";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import { asyncHandle } from "@s/routes/adapters";
import appBindingsContainer, { tablesArr } from "@s/config/containers/container.di";

export const upload = multer({storage: multer.memoryStorage()})

const publicRouter = Router();

// СТАНДАРТНЫЙ ЗАПРОС
publicRouter.get('/', (req, res) => {logger.info('Работает'); res.sendStatus(200)})
// АВТОРИЗАЦИЯ
publicRouter.post(serverPaths.registration, upload.single('avatar'), asyncHandle(appBindingsContainer.get(AuthController).registartion))
publicRouter.post(serverPaths.login, asyncHandle(appBindingsContainer.get(AuthController).login))
publicRouter.get(serverPaths.initial, asyncHandle(appBindingsContainer.get(AuthController).initial))
publicRouter.get(`${serverPaths.checkEmail}/:email`, asyncHandle(appBindingsContainer.get(AuthController).checkEmail))

// РАСШИРЕННЫЙ ПОИСК
publicRouter.get(`${serverPaths.extendedSearch}`, asyncHandle(appBindingsContainer.get(ExtendedSearchController).getForms))
// ПОИСК ПОЛЬЗОВАТЕЛЕЙ
publicRouter.get(`${serverPaths.searchForm}/:search`, asyncHandle(appBindingsContainer.get(FormController).searchForm))

// ТЕСТ КОМПРЕССИИ НЕ УДАЛЯТЬ
// publicRouter.post(serverPaths.testCompressViedo, upload.single('video'), asyncHandle(HttpFilesController.TestConvertVideo))
// publicRouter.post(serverPaths.testCompressAudio, upload.single('audio'), asyncHandle(HttpFilesController.TestConvertAudio))

export default publicRouter;
