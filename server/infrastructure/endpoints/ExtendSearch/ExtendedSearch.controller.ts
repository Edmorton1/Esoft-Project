import ExtendedSearchValidation from "@s/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.validation"
import ExtendedSearchModule from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSearch.module"
import ExtendedSeacrhSQLhelper from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper"
import logger from "@s/helpers/logger"
import { inject, injectable } from "inversify"
import HttpContext from "@s/config/express/Http.context"
import BaseController from "@s/config/base/Base.controller"
import { serverPaths } from "@shared/PATHS"

@injectable()
class ExtendedSearchController extends BaseController {
  constructor (
    @inject(ExtendedSearchModule)
    private readonly ExtendedSearchModule: ExtendedSearchModule,
    @inject(ExtendedSeacrhSQLhelper)
    private readonly ExtendedSeacrhSQLhelper: ExtendedSeacrhSQLhelper
  ) {
    super()
    
    this.bindRoutes([
      {
        path: serverPaths.extendedSearch,
        method: "get",
        handle: this.getForms,
      },
    ])
  }
  getForms = async (ctx: HttpContext) => {
    const {tags, page, min_age, max_age, avatar, location, max_distance, name, params} = ExtendedSearchValidation(ctx)

    const tagsArr = tags ? await this.ExtendedSeacrhSQLhelper.getUserTags(tags) : []

    const zapisi = await this.ExtendedSearchModule.getByTags({tags: tagsArr, params, page, min_age, max_age, avatar, location, name, max_distance})
    
    logger.info(tagsArr)
    logger.info(zapisi.forms.length)

    // res.set('x-total-count', toJSON(zapisi.count))
    // ctx.set('x-pages-count', toJSON(zapisi.count))
    ctx.json(zapisi)
  }
}

export default ExtendedSearchController