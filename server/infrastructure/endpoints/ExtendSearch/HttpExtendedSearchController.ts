import SQLHard from "@s/infrastructure/endpoints/ExtendSearch/sql/SQLHard"
import logger from "@s/logger"
import { frJSON } from "@shared/MAPPERS"
import { lnglatType } from "@t/gen/types"
import { Request, Response } from "express"

class HttpExtendedSearchController {

  getForms = async (req: Request<object, object, object, {tags: string, params: string, min_age: string, max_age: string, page: string, avatar: string, location: string, max_distance: string}>, res: Response) => {
    const {tags, page, min_age, max_age, avatar, location, max_distance, ...params} = req.query
    logger.info(min_age, max_age, params, avatar, max_distance)
    // logger.info({LOCATION_USER: frJSON(location)})
    logger.info({MAX_DISTANCE: max_distance})
    

    const tagsArr = tags ? await SQLHard.getUserTags(tags?.trim()) : []

    const zapisi = await SQLHard.getByTags(tagsArr, params, page, min_age, max_age, avatar, frJSON<lnglatType>(location), max_distance)
    
    logger.info(tagsArr)
    logger.info(zapisi.forms.length)

    res.json(zapisi)
  }
}

export default new HttpExtendedSearchController