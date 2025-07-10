import AuthController from "@app/server/infrastructure/endpoints/Auth/Auth.controller";
import ExtendedSearchController from "@app/server/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller";
import FormController from "@app/server/infrastructure/endpoints/Form/Form.controller";
import SettingsController from "@app/server/infrastructure/endpoints/Settings/Settings.controller";
import MessagesOutController from "@app/server/infrastructure/endpoints/MessageOutside/MessagesOut.controller";
import MessagesController from "@app/server/infrastructure/endpoints/Messages/Messages.controller";
import PostsController from "@app/server/infrastructure/endpoints/Posts/Posts.controller";
import LikesController from "@app/server/infrastructure/endpoints/Likes/Likes.controller";
import { ContainerModule, Factory } from "inversify";
import CRUDController from "@app/server/infrastructure/endpoints/CRUD/CRUDController";
import ORM from "@app/server/infrastructure/db/SQL/ORM";
import TYPES from "@app/server/config/containers/types";
import { tables } from "@app/types/gen/types";

const controllerBindings = new ContainerModule(({ bind }) => {
	bind<LikesController>(TYPES.Controllers.Likes).to(LikesController);
	bind<AuthController>(TYPES.Controllers.Auth).to(AuthController);
	bind<ExtendedSearchController>(TYPES.Controllers.ExtendedSearch).to(ExtendedSearchController);
	bind<FormController>(TYPES.Controllers.Form).to(FormController);
	bind<SettingsController>(TYPES.Controllers.Settings).to(SettingsController);
	bind<MessagesController>(TYPES.Controllers.Messages).to(MessagesController);
	bind<MessagesOutController>(TYPES.Controllers.MessagesOut).to(MessagesOutController);
	bind<PostsController>(TYPES.Controllers.Posts).to(PostsController);

	bind<Factory<CRUDController>>(TYPES.CRUD.Factory).toFactory(context => {
		return (table: tables) => {
			const orm = context.get<ORM>(ORM);
			return new CRUDController(table, orm);
		};
	});
});

export default controllerBindings;
