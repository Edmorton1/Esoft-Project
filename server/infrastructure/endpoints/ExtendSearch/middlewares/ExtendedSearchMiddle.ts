import { queryType, zodParams } from "@s/infrastructure/endpoints/ExtendSearch/middlewares/Schemas";
import logger from "@s/logger";
import {Request, Response, NextFunction} from "express";

export interface ExtendedParamsInterface extends Request {
  filters: queryType
}

function ExtendedSearchMiddle(req: Request, res: Response, next: NextFunction) {
  const r = req as ExtendedParamsInterface
  const {tags, min_age, max_age, page, avatar, location, max_distance, name, ...params} = req.query

  const parsed = zodParams.parse({tags, min_age, max_age, page, avatar, location, max_distance, params, name})

  logger.debug({ПАРАМЕТРЫ_EXT_SEARCH: parsed})
  
  r.filters = parsed

  next()
}

export default ExtendedSearchMiddle;
