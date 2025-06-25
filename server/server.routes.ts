import LikesController from "@s/infrastructure/endpoints/Likes/Likes.controller";
import { inject, injectable } from "inversify";
import { Router } from "express";
import AuthController from "@s/infrastructure/endpoints/Auth/Auth.controller";
import ExtendedSearchController from "@s/infrastructure/endpoints/ExtendSearch/ExtendedSearch.controller";
import CRUDController from "@s/infrastructure/endpoints/CRUD/CRUDController";
import FormController from "@s/infrastructure/endpoints/Form/Form.controller";
import SettingsController from "@s/infrastructure/endpoints/Settings/Settings.controller";
import MessagesOutController from "@s/infrastructure/endpoints/MessageOutside/MessagesOut.controller";
import MessagesController from "@s/infrastructure/endpoints/Messages/Messages.controller";

@injectable()
class ServerRoutes {
	router: Router;

	constructor(
		@inject(LikesController)
		private readonly likesController: LikesController,

		// @inject(CRUDController)
		// private readonly crudController: CRUDController,

		@inject(AuthController)
		private readonly authController: AuthController,

		@inject(ExtendedSearchController)
		private readonly extendedSearchController: ExtendedSearchController,

		@inject(SettingsController)
		private readonly settingsController: SettingsController,

		@inject(MessagesOutController)
		private readonly messagesOutController: MessagesOutController,

		@inject(MessagesController)
		private readonly messagesController: MessagesController,

		@inject(FormController)
		private readonly formController: FormController,
	) {
		this.router = Router();

		this.router.use(this.likesController.router);
	}
}

export default ServerRoutes;
