import { zodParams } from "@app/server/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.schemas";
import logger from "@app/server/helpers/logger/logger";
import HttpContext from "@app/server/config/express/Http.context";
import { XLNGLAT } from "@app/shared/HEADERS";

function ExtendedSearchValidation(ctx: HttpContext) {
  const {tags, min_age, max_age, page, avatar, max_distance, name, ...params} = ctx.query
  const location = ctx.headers(XLNGLAT)
  console.log("ЛОКЕЙШН", location)

  const parsed = zodParams.parse({tags, min_age, max_age, page, avatar, location, max_distance, params, name})

  console.log("ПАРСЕД ЛОКЕЙШН", parsed.location)
  logger.debug({ПАРАМЕТРЫ_EXT_SEARCH: parsed})
  
  return parsed
}

export default ExtendedSearchValidation;
