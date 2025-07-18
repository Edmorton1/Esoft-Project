import { ContainerModule, Factory } from "inversify";
import CRUDController from "@app/server/infrastructure/requests/CRUD/CRUDController";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import TYPES from "@app/server/config/containers/types";
import { tables, tablesArr } from "@app/types/gen/types";

const fabricsBindings = new ContainerModule(({ bind }) => {
	bind<Factory<CRUDController>>(TYPES.CRUD.Factory).toFactory((context) => {
		return (table: tables) => {
			const orm = context.get<ORM>(ORM);
			return new CRUDController(table, orm);
		};
	});

	for (const table of tablesArr) {
		const sym = TYPES.CRUD.Controllers[table];
		bind<CRUDController>(sym).toDynamicValue((context) => {
			const orm = context.get<ORM>(ORM);
			return new CRUDController(table, orm);
		}).inSingletonScope();
	}
});

export default fabricsBindings;
