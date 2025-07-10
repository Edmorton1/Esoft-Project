import BaseController from "@app/server/config/base/Base.controller";
import HttpContext from "@app/server/config/express/Http.context";
import { serverPaths } from "@app/shared/PATHS";
import { injectable } from "inversify";

interface IYandexController {
  getToken: (ctx: HttpContext) => Promise<void>
}

@injectable()
class YandexController extends BaseController implements IYandexController {
  constructor () {
    super()
    this.bindRoutes([
      {
        path: serverPaths.yandexGetToken,
        method: "get",
        handle: this.getToken
      }
    ])
  }

  getToken: IYandexController['getToken'] = async (ctx) => {
    ctx.json(ctx)
  }
}

export default YandexController