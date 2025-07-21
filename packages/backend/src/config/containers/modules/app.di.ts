import App from "@app/server/server/server";
import ServerExpress from "@app/server/server/server.express";
import ServerRoutes from "@app/server/server/express.routes";
import { ContainerModule } from "inversify";

const appBindings = new ContainerModule(({ bind }) => {
	bind<ServerRoutes>(ServerRoutes).toSelf();
	bind<ServerExpress>(ServerExpress).toSelf();
	bind<App>(App).toSelf();
});

export default appBindings