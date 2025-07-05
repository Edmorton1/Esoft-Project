import { Container, ContainerModule, Factory } from "inversify";
import ORM from "@app/server/infrastructure/db/SQL/ORM";
import { clients, clientsType } from "@app/server/helpers/WebSocket/socket";
import LikesModule from "@app/server/infrastructure/endpoints/Likes/sql/Likes.module";
import LikesController from "@app/server/infrastructure/endpoints/Likes/Likes.controller";
import { tables } from "@app/types/gen/types";
import CRUDController from "@app/server/infrastructure/endpoints/CRUD/CRUDController";
import TYPES from "@app/server/config/containers/types";
import AuthService from "@app/server/infrastructure/endpoints/Auth/services/Auth.service";
import FilesService from "@app/server/infrastructure/services/Files.service";
import AuthController from "@app/server/infrastructure/endpoints/Auth/Auth.controller";
import ExtendedSearchModule from "@app/server/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSearch.module";
import ExtendedSeacrhSQLhelper from "@app/server/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper";
import ExtendedSearchController from "@app/server/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller";
import FormController from "@app/server/infrastructure/endpoints/Form/Form.controller";
import SettingsController from "@app/server/infrastructure/endpoints/Settings/Settings.controller";
import Yandex from "@app/server/helpers/yandex";
import SettingsService from "@app/server/infrastructure/endpoints/Settings/services/Settings.service";
import MessagesOutModule from "@app/server/infrastructure/endpoints/MessageOutside/sql/MessagesOut.module";
import MessagesOutController from "@app/server/infrastructure/endpoints/MessageOutside/MessagesOut.controller";
import MessagesController from "@app/server/infrastructure/endpoints/Messages/Messages.controller";
import MessagesSQL from "@app/server/infrastructure/endpoints/Messages/SQL/Message.module";
import MessagesService from "@app/server/infrastructure/endpoints/Messages/services/Messages.service";
import LikesService from "@app/server/infrastructure/endpoints/Likes/services/LikesService";
import MessageOutService from "@app/server/infrastructure/endpoints/MessageOutside/service/MessageOut.service";
import SharedService from "@app/server/infrastructure/services/Shared.service";
import ConfigService from "@app/server/config/services/config.service";
import App from "@app/server/server/server";
import ServerExpress from "@app/server/server/server.express";
import ServerRoutes from "@app/server/server/express.routes";
import PostsController from "@app/server/infrastructure/endpoints/Posts/Posts.controller";
import PostsService from "@app/server/infrastructure/endpoints/Posts/services/Posts.service";
import LoggerController, { ILogger } from "@app/server/helpers/logger/logger.controller";
import PinoService from "@app/server/helpers/logger/pino.service";
// import PostsModule from "@app/server/infrastructure/endpoints/Posts/sql/Posts.module";
// import LikesValidation from "@app/server/infrastructure/endpoints/Likes/validation/Likes.validation";

export const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags', "posts"]

const appBindingsModule = new ContainerModule(({bind}) => {
  bind<PinoService>(PinoService).toSelf()
  bind<ILogger>(TYPES.LoggerController).to(LoggerController)

  bind<ORM>(ORM).toSelf()
  bind<SharedService>(SharedService).toSelf()
  bind<Yandex>(Yandex).toSelf()
  bind<FilesService>(FilesService).toSelf()
  bind<clientsType>(TYPES.clients).toConstantValue(clients)

  bind<LikesModule>(LikesModule).toSelf()
  bind<LikesService>(LikesService).toSelf()

  bind<AuthService>(AuthService).toSelf()

  bind<ExtendedSeacrhSQLhelper>(ExtendedSeacrhSQLhelper).toSelf()
  bind<ExtendedSearchModule>(ExtendedSearchModule).toSelf()

  bind<SettingsService>(SettingsService).toSelf()

  bind<MessagesOutModule>(MessagesOutModule).toSelf()
  bind<MessageOutService>(MessageOutService).toSelf()
  bind<MessagesSQL>(MessagesSQL).toSelf()
  bind<MessagesService>(MessagesService).toSelf()

  bind<PostsService>(PostsService).toSelf()
  // bind<PostsModule>(PostsModule).toSelf()

  bind<ServerRoutes>(ServerRoutes).toSelf()
  bind<ServerExpress>(ServerExpress).toSelf()
  bind<ConfigService>(ConfigService).toSelf()
  bind<App>(App).toSelf()
})

// -------------------------------------------------------------------------

const controllerBindingsContainer = new Container()
controllerBindingsContainer.load(appBindingsModule)

controllerBindingsContainer.bind<LikesController>(TYPES.Controllers.Likes).to(LikesController)

controllerBindingsContainer.bind<AuthController>(TYPES.Controllers.Auth).to(AuthController)
controllerBindingsContainer.bind<ExtendedSearchController>(TYPES.Controllers.ExtendedSearch).to(ExtendedSearchController)

controllerBindingsContainer.bind<FormController>(TYPES.Controllers.Form).to(FormController)

controllerBindingsContainer.bind<SettingsController>(TYPES.Controllers.Settings).to(SettingsController)

controllerBindingsContainer.bind<MessagesController>(TYPES.Controllers.Messages).to(MessagesController)

controllerBindingsContainer.bind<MessagesOutController>(TYPES.Controllers.MessagesOut).to(MessagesOutController)

controllerBindingsContainer.bind<PostsController>(TYPES.Controllers.Posts).to(PostsController)

controllerBindingsContainer.bind<Factory<CRUDController>>(TYPES.CRUD.Factory).toFactory(context => {
  return (table: tables) => {
    const orm = context.get<ORM>(ORM)
    return new CRUDController(table, orm)
  }
})

const factory = controllerBindingsContainer.get<(table: tables) => CRUDController>(TYPES.CRUD.Factory)
tablesArr.forEach((table) => {
  const sym = TYPES.CRUD.Controllers[table]
  controllerBindingsContainer.bind<CRUDController>(sym).toConstantValue(factory(table))
})

export default controllerBindingsContainer

// ПЕРВЫЙ ПОДХОД

// container.bind<CRUDController>(TYPES.CRUDController.users).toConstantValue(new CRUDController(tablesArr[0], container.get(TYPES.ORM)))
// container.bind<CRUDController>(TYPES.CRUDController.forms).toConstantValue(new CRUDController(tablesArr[1], container.get(TYPES.ORM)))
// container.bind<CRUDController>(TYPES.CRUDController.likes).toConstantValue(new CRUDController(tablesArr[2], container.get(TYPES.ORM)))
// container.bind<CRUDController>(TYPES.CRUDController.messages).toConstantValue(new CRUDController(tablesArr[3], container.get(TYPES.ORM)))
// container.bind<CRUDController>(TYPES.CRUDController.tags).toConstantValue(new CRUDController(tablesArr[4], container.get(TYPES.ORM)))
// container.bind<CRUDController>(TYPES.CRUDController.user_tags).toConstantValue(new CRUDController(tablesArr[5], container.get(TYPES.ORM)))

// ВТОРОЙ

// container.bind<CRUDController>(TYPES.CRUDTables[table]).toConstantValue(factory(table))

// tablesArr.forEach(table => {
//   const sym = TYPES.CRUDController[table];
//   const orm = container.get<ORMCopy>(TYPES.ORM)
//   const controller = new CRUDController(table, orm)
//   container.bind<CRUDController>(sym).toConstantValue(controller)
// })