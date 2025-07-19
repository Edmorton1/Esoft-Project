import TYPES from "@app/server/config/containers/types";
import Utils from "@app/server/infrastructure/helpers/databases/postgres/utils";
import LastActiveFuncs from "@app/server/infrastructure/helpers/WebSocket/LastActiveFunc";
import { ContainerModule } from "inversify";

const singleBindings = new ContainerModule(({ bind }) => {
	bind<LastActiveFuncs>(LastActiveFuncs).toSelf().inSingletonScope();
	bind<Utils>(TYPES.Utils).to(Utils).inSingletonScope();
});

export default singleBindings;
