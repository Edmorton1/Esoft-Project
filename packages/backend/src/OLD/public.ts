// import {Router} from "express";
// import { universalController } from "@app/server/OLD/controllers"
// import { serverPaths } from "@app/shared/PATHS"
// import AuthController from "@app/server/infrastructure/endpoints/Auth/Auth.controller"
// // import HttpFilesController from "@app/server/infrastructure/endpoints/Files/HttpFilesController"
// import ExtendedSearchController from "@app/server/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller"
// // import CRUDMiddleware from "@app/server/infrastructure/middlewares/CRUDMiddleware"
// import logger from "@app/server/helpers/logger/logger"
// import FormController from "@app/server/infrastructure/endpoints/Form/Form.controller"
// import { asyncHandle } from "@app/server/adapters/Express.adapter";
// import appBindingsContainer, { tablesArr } from "@app/server/config/containers/container.di";
// import { upload } from "@app/server/infrastructure/endpoints/multer";

// const publicRouter = Router();

// // СТАНДАРТНЫЙ ЗАПРОС
// publicRouter.get('/', (req, res) => {logger.info('Работает'); res.sendStatus(200)})

// // АВТОРИЗАЦИЯ
// publicRouter.post(serverPaths.registration, upload.single('avatar'), asyncHandle(appBindingsContainer.get(AuthController).registartion))
// publicRouter.post(serverPaths.login, asyncHandle(appBindingsContainer.get(AuthController).login))
// publicRouter.get(serverPaths.initial, asyncHandle(appBindingsContainer.get(AuthController).initial))
// publicRouter.get(`${serverPaths.checkEmail}/:email`, asyncHandle(appBindingsContainer.get(AuthController).checkEmail))

// // РАСШИРЕННЫЙ ПОИСК
// publicRouter.get(`${serverPaths.extendedSearch}`, asyncHandle(appBindingsContainer.get(ExtendedSearchController).getForms))
// // ПОИСК ПОЛЬЗОВАТЕЛЕЙ
// publicRouter.get(`${serverPaths.searchForm}/:search`, asyncHandle(appBindingsContainer.get(FormController).searchForm))

// // ТЕСТ КОМПРЕССИИ НЕ УДАЛЯТЬ
// // publicRouter.post(serverPaths.testCompressViedo, upload.single('video'), asyncHandle(HttpFilesController.TestConvertVideo))
// // publicRouter.post(serverPaths.testCompressAudio, upload.single('audio'), asyncHandle(HttpFilesController.TestConvertAudio))

// export default publicRouter;
