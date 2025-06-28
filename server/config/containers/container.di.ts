import { Container, ContainerModule, Factory } from "inversify";
import ORM from "@s/infrastructure/db/SQL/ORM";
import { clients, clientsType } from "@s/helpers/WebSocket/socket";
import LikesModule from "@s/infrastructure/endpoints/Likes/sql/Likes.module";
import LikesController from "@s/infrastructure/endpoints/Likes/Likes.controller";
import { tables } from "@t/gen/types";
import CRUDController from "@s/infrastructure/endpoints/CRUD/CRUDController";
import TYPES from "@s/config/containers/types";
import AuthService from "@s/infrastructure/endpoints/Auth/services/Auth.service";
import FilesService from "@s/infrastructure/services/Files.service";
import AuthController from "@s/infrastructure/endpoints/Auth/Auth.controller";
import ExtendedSearchModule from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSearch.module";
import ExtendedSeacrhSQLhelper from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper";
import ExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller";
import FormController from "@s/infrastructure/endpoints/Form/Form.controller";
import SettingsController from "@s/infrastructure/endpoints/Settings/Settings.controller";
import Yandex from "@s/helpers/yandex";
import SettingsService from "@s/infrastructure/endpoints/Settings/services/Settings.service";
import MessagesOutModule from "@s/infrastructure/endpoints/MessageOutside/sql/MessagesOut.module";
import MessagesOutController from "@s/infrastructure/endpoints/MessageOutside/MessagesOut.controller";
import MessagesController from "@s/infrastructure/endpoints/Messages/Messages.controller";
import MessagesSQL from "@s/infrastructure/endpoints/Messages/SQL/Message.module";
import MessagesService from "@s/infrastructure/endpoints/Messages/services/Messages.service";
import LikesService from "@s/infrastructure/endpoints/Likes/services/LikesService";
import MessageOutService from "@s/infrastructure/endpoints/MessageOutside/service/MessageOut.service";
import SharedService from "@s/infrastructure/services/Shared.service";
import ConfigService from "@s/config/services/config.service";
import App from "@s/server/server";
import ServerExpress from "@s/server/server.express";
import ServerRoutes from "@s/server/express.routes";
import PostsController from "@s/infrastructure/endpoints/Posts/Posts.controller";
import PostsService from "@s/infrastructure/endpoints/Posts/services/Posts.service";
// import PostsModule from "@s/infrastructure/endpoints/Posts/sql/Posts.module";
// import LikesValidation from "@s/infrastructure/endpoints/Likes/validation/Likes.validation";

export const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags', "posts"]

const appBindingsModule = new ContainerModule(({bind}) => {
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