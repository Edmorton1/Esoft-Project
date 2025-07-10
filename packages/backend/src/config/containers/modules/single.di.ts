import LastActiveFuncs from "@app/server/helpers/WebSocket/LastActiveFunc";
import { ContainerModule } from "inversify";

const singleBindings = new ContainerModule(({ bind }) => {
	bind<LastActiveFuncs>(LastActiveFuncs).toSelf();
});

export default singleBindings