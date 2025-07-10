import Utils from "@app/server/infrastructure/helpers/databases/postgres/utils";
import LastActiveFuncs from "@app/server/infrastructure/helpers/WebSocket/LastActiveFunc";
import { ContainerModule } from "inversify";

const singleBindings = new ContainerModule(({ bind }) => {
	bind<LastActiveFuncs>(LastActiveFuncs).toSelf();
	bind<Utils>(Utils).toSelf();
});

export default singleBindings;
