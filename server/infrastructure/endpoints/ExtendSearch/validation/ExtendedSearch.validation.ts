import { zodParams } from "@s/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.schemas";
import logger from "@s/helpers/logger";
import {Request} from "express";

function ExtendedSearchValidation(req: Request) {
  const {tags, min_age, max_age, page, avatar, location, max_distance, name, ...params} = req.query

  const parsed = zodParams.parse({tags, min_age, max_age, page, avatar, location, max_distance, params, name})

  logger.debug({ПАРАМЕТРЫ_EXT_SEARCH: parsed})
  
  return parsed
}

export default ExtendedSearchValidation;
