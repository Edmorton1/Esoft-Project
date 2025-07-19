import { clients, clientsType } from "@app/server/infrastructure/helpers/WebSocket/socket";
import Yandex from "@app/server/infrastructure/helpers/yandex";
import LoggerController, {
	ILogger,
} from "@app/server/infrastructure/helpers/logger/logger.controller";
import PinoService from "@app/server/infrastructure/helpers/logger/pino.service";
import db, { DBType } from "@app/server/infrastructure/helpers/databases/postgres/config/db";
import { ContainerModule } from "inversify";
import TYPES from "@app/server/config/containers/types";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import SharedService from "@app/server/infrastructure/requests/shared/services/Shared.service";
import FilesService from "@app/server/infrastructure/requests/shared/services/Files.service";
import SQLForm from "@app/server/infrastructure/helpers/databases/postgres/SQLform";
import CryptoService from "@app/server/infrastructure/requests/shared/services/Crypto.service";

const utilityBindings = new ContainerModule(({ bind }) => {
	bind<PinoService>(TYPES.PinoService).to(PinoService);
	bind<ILogger>(TYPES.LoggerController).to(LoggerController);
	bind<DBType>(TYPES.DataBase).toConstantValue(db);
	bind<ORM>(ORM).toSelf();
	bind<SharedService>(SharedService).toSelf();
	bind<Yandex>(Yandex).toSelf();
	bind<FilesService>(FilesService).toSelf();
	bind<clientsType>(TYPES.clients).toConstantValue(clients);
	bind<SQLForm>(SQLForm).toSelf();
	bind<CryptoService>(CryptoService).toSelf();
});

export default utilityBindings;
