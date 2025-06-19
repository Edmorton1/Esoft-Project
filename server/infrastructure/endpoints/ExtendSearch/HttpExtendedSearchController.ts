import { ExtendedParamsInterface } from "@s/infrastructure/endpoints/ExtendSearch/middlewares/ExtendedSearchMiddle"
import SQLHard from "@s/infrastructure/endpoints/ExtendSearch/SQL/SQLHard"
import SQLHelper from "@s/infrastructure/endpoints/ExtendSearch/SQL/SQLHelper"
import logger from "@s/logger"
import { toJSON } from "@shared/MAPPERS"
import { Request, Response } from "express"

class HttpExtendedSearchController {

  getForms = async (req: Request, res: Response) => {
    const r = req as ExtendedParamsInterface
    const {tags, page, min_age, max_age, avatar, location, max_distance, name, params} = r.filters

    const tagsArr = tags ? await SQLHelper.getUserTags(tags) : []

    const zapisi = await SQLHard.getByTags({tags: tagsArr, params, page, min_age, max_age, avatar, location, name, max_distance})
    
    logger.info(tagsArr)
    logger.info(zapisi.forms.length)

    // res.set('x-total-count', toJSON(zapisi.count))
    res.set('x-pages-count', toJSON(zapisi.count))
    res.json(zapisi)
  }
}

export default new HttpExtendedSearchController