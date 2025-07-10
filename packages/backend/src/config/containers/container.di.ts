import { Container } from "inversify";
import utilityBindings from "@app/server/config/containers/modules/utils.di";
import moduleBindings from "@app/server/config/containers/modules/modules.di";
import serviceBindings from "@app/server/config/containers/modules/services.di";
import appBindings from "@app/server/config/containers/modules/app.di";
import controllerBindings from "@app/server/config/containers/modules/controllers.di";
import { tables, tablesArr } from "@app/types/gen/types";
import CRUDController from "@app/server/infrastructure/requests/CRUD/CRUDController";
import TYPES from "@app/server/config/containers/types";
import singleBindings from "@app/server/config/containers/modules/single.di";

const mainCont = new Container();
mainCont.load(utilityBindings);
mainCont.load(moduleBindings);
mainCont.load(serviceBindings);
mainCont.load(appBindings);
mainCont.load(singleBindings)

// БИНД КОНТРОЛЛЕРОВ
mainCont.load(controllerBindings);

const factory = mainCont.get<(table: tables) => CRUDController>(TYPES.CRUD.Factory);
tablesArr.forEach(table => {
	const sym = TYPES.CRUD.Controllers[table];
	mainCont.bind<CRUDController>(sym).toConstantValue(factory(table));
});
// БИНД КОНТРОЛЛЕРОВ

export default mainCont;

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
