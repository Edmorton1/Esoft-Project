import ExtendedSearchValidation from "@s/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.validation"
import ExtendedSearchModule from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSearch.module"
import ExtendedSeacrhSQLhelper from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper"
import logger from "@s/helpers/logger"
import { toJSON } from "@shared/MAPPERS"
import { Request, Response } from "express"
import { inject, injectable } from "inversify"

@injectable()
class ExtendedSearchController {
  constructor (
    @inject(ExtendedSearchModule)
    private readonly ExtendedSearchModule: ExtendedSearchModule,
    @inject(ExtendedSeacrhSQLhelper)
    private readonly ExtendedSeacrhSQLhelper: ExtendedSeacrhSQLhelper
  ) {}
  getForms = async (req: Request, res: Response) => {
    const {tags, page, min_age, max_age, avatar, location, max_distance, name, params} = ExtendedSearchValidation(req)

    const tagsArr = tags ? await this.ExtendedSeacrhSQLhelper.getUserTags(tags) : []

    const zapisi = await this.ExtendedSearchModule.getByTags({tags: tagsArr, params, page, min_age, max_age, avatar, location, name, max_distance})
    
    logger.info(tagsArr)
    logger.info(zapisi.forms.length)

    // res.set('x-total-count', toJSON(zapisi.count))
    res.set('x-pages-count', toJSON(zapisi.count))
    res.json(zapisi)
  }
}

export default ExtendedSearchController