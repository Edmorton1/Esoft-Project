import BaseController from "@app/server/config/base/Base.controller";
import HttpContext from "@app/server/config/express/Http.context";
import { serverPaths } from "@app/shared/PATHS";
import { injectable } from "inversify";

interface IGoogleController {
  getToken: (ctx: HttpContext) => Promise<void>
}

@injectable()
class GoogleController extends BaseController implements IGoogleController {
  constructor () {
    super()
    this.bindRoutes([
      {
        path: serverPaths.googleGetToken,
        method: "get",
        handle: this.getToken
      }
    ])
  }

  getToken: IGoogleController['getToken'] = async (ctx) => {
    ctx.json(ctx)
  }
}

export default GoogleController