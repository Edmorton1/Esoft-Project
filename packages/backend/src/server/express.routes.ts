import { injectable } from "inversify";
import { Router } from "express";
import TYPES from "@app/server/config/containers/types";
import controllerBindingsContainer from "@app/server/config/containers/container.di";
import BaseController from "@app/server/config/base/Base.controller";

@injectable()
class ServerRoutes {
	router: Router;

	constructor() {
		this.router = Router();

    // console.log({TYPES_IN_SERVERROUTES: TYPES.CRUD.Controllers})
    const controllesSymbols = [...Object.values(TYPES.CRUD.Controllers), ...Object.values(TYPES.Controllers)]
    // console.log("ASDASASDDASASD", controllesSymbols)

    controllesSymbols.forEach(sym => {
      const controller: BaseController = controllerBindingsContainer.get(sym)
			this.router.use(controller.router)
      // if (controller instanceof LikesController || controller instanceof CRUDController) {
        // this.router.use(controller.router)
      // }
    })

		// this.router.use(this.likesController.router);
	}
}

export default ServerRoutes;
