import { clients, clientsType } from "@app/server/helpers/WebSocket/socket";
import FilesService from "@app/server/infrastructure/services/Files.service";
import Yandex from "@app/server/helpers/yandex";
import SharedService from "@app/server/infrastructure/services/Shared.service";
import LoggerController, { ILogger } from "@app/server/helpers/logger/logger.controller";
import PinoService from "@app/server/helpers/logger/pino.service";
import db, { DBType } from "@app/server/infrastructure/db/db";
import { ContainerModule } from "inversify";
import TYPES from "@app/server/config/containers/types";
import ORM from "@app/server/infrastructure/db/SQL/ORM";

const utilityBindings = new ContainerModule(({bind}) => {
  bind<PinoService>(PinoService).toSelf()
  bind<ILogger>(TYPES.LoggerController).to(LoggerController)
  bind<DBType>(TYPES.DataBase).toConstantValue(db)
  bind<ORM>(ORM).toSelf()
  bind<SharedService>(SharedService).toSelf()
  bind<Yandex>(Yandex).toSelf()
  bind<FilesService>(FilesService).toSelf()
  bind<clientsType>(TYPES.clients).toConstantValue(clients)
})

export default utilityBindings