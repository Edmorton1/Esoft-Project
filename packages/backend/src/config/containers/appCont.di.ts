import utilityBindings from "@app/server/config/containers/modules/utils.di";
import moduleBindings from "@app/server/config/containers/modules/modules.di";
import serviceBindings from "@app/server/config/containers/modules/services.di";
import controllerBindings from "@app/server/config/containers/modules/controllers.di";
import { tablesArr } from "@app/types/gen/types";
import CRUDController from "@app/server/infrastructure/requests/CRUD/CRUDController";
import TYPES from "@app/server/config/containers/types";
import singleBindings from "@app/server/config/containers/modules/single.di";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import appBindings from "@app/server/config/containers/modules/app.di";
import { Container } from "inversify";

const appCont = new Container();
appCont.load(utilityBindings);
appCont.load(moduleBindings);
appCont.load(serviceBindings);
appCont.load(singleBindings);
appCont.load(appBindings);

// БИНД КОНТРОЛЛЕРОВ
appCont.load(controllerBindings);

tablesArr.forEach(table => {
	const sym = TYPES.CRUD.Controllers[table];
	appCont
		.bind<CRUDController>(sym)
		.toDynamicValue(context => {
			const orm = context.get<ORM>(ORM);
			return new CRUDController(table, orm);
		})
		.inSingletonScope();
});

export default appCont;
