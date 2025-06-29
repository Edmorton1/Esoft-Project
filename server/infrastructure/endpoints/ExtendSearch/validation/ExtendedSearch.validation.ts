import { zodParams } from "@s/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.schemas";
import logger from "@s/helpers/logger/logger";
import HttpContext from "@s/config/express/Http.context";

function ExtendedSearchValidation(ctx: HttpContext) {
  const {tags, min_age, max_age, page, avatar, location, max_distance, name, ...params} = ctx.query

  const parsed = zodParams.parse({tags, min_age, max_age, page, avatar, location, max_distance, params, name})

  logger.debug({ПАРАМЕТРЫ_EXT_SEARCH: parsed})
  
  return parsed
}

export default ExtendedSearchValidation;
