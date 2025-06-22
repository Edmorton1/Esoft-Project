import { Container, Factory } from "inversify";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";
import { clients, clientsType } from "@s/helpers/WebSocket/socket";
import LikesModule from "@s/infrastructure/endpoints/Likes/sql/Likes.module";
import LikesController from "@s/infrastructure/endpoints/Likes/Likes.controller";
import { tables } from "@t/gen/types";
import CRUDController from "@s/infrastructure/endpoints/CRUD/CRUDController";
import TYPES from "@s/routes/containers/types";
import AuthService from "@s/infrastructure/endpoints/Auth/services/Auth.service";
import UploadFileService from "@s/infrastructure/services/UploadFileService";
import AuthController from "@s/infrastructure/endpoints/Auth/Auth.controller";
import ExtendedSearchModule from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSearch.module";
import ExtendedSeacrhSQLhelper from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper";
import ExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller";
import FormController from "@s/infrastructure/endpoints/Form/Form.controller";
import SettingsController from "@s/infrastructure/endpoints/Settings/Settings.controller";
import Yandex from "@s/helpers/yandex";
import SettingsService from "@s/infrastructure/endpoints/Settings/services/Settings.service";
import MessagesOutModule from "@s/infrastructure/endpoints/MessageOutside/SQL/MessagesOut.module";
import MessagesOutController from "@s/infrastructure/endpoints/MessageOutside/MessagesOut.controller";
import MessagesController from "@s/infrastructure/endpoints/Messages/Messages.controller";
import MessagesSQL from "@s/infrastructure/endpoints/Messages/SQL/Message.module";
import MessagesService from "@s/infrastructure/endpoints/Messages/services/Messages.service";

export const tablesArr: tables[] = ['users', 'forms', 'likes', 'messages', 'tags', 'user_tags']

const container = new Container()

container.bind<ORMCopy>(ORMCopy).toSelf()
container.bind<clientsType>(TYPES.clients).toConstantValue(clients)
container.bind<LikesModule>(LikesModule).toSelf()

container.bind<LikesController>(LikesController).toSelf()

container.bind<Factory<CRUDController>>(TYPES.CRUD.Factory).toFactory(context => {
  return (table: tables) => {
    const orm = context.get<ORMCopy>(ORMCopy)
    return new CRUDController(table, orm)
  }
})

const factory = container.get<(table: tables) => CRUDController>(TYPES.CRUD.Factory)
tablesArr.forEach((table) => {
  const sym = TYPES.CRUD.Tables[table]
  container.bind<CRUDController>(sym).toConstantValue(factory(table))
})

container.bind<Yandex>(Yandex).toSelf()
container.bind<UploadFileService>(UploadFileService).toSelf()
container.bind<AuthService>(AuthService).toSelf()

container.bind<AuthController>(AuthController).toSelf()

container.bind<ExtendedSeacrhSQLhelper>(ExtendedSeacrhSQLhelper).toSelf()
container.bind<ExtendedSearchModule>(ExtendedSearchModule).toSelf()
container.bind<ExtendedSearchController>(ExtendedSearchController).toSelf()

container.bind<FormController>(FormController).toSelf()

container.bind<SettingsService>(SettingsService).toSelf()
container.bind<SettingsController>(SettingsController).toSelf()

container.bind<MessagesOutModule>(MessagesOutModule).toSelf()
container.bind<MessagesOutController>(MessagesOutController).toSelf()


container.bind<MessagesSQL>(MessagesSQL).toSelf()
container.bind<MessagesService>(MessagesService).toSelf()
container.bind<MessagesController>(MessagesController).toSelf()

export default container

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