import db from "@s/infrastructure/db/db";
import requestToForm from "@s/infrastructure/db/requests/SQLform";
import { fieldsToArr } from "@s/infrastructure/db/requests/utils";
import logger from "@s/logger";
import { LIKES_ON_PAGE } from "@shared/CONST";
import { lnglatType, Tables, tables } from "@t/gen/types";

// export const getManyByParam = async <T extends tables>(param: keyof Tables[T], need: any[], table: T, fields?: string) => {
export const getManyByParam = async (name: string, need: any[], distance?: lnglatType, cursor?: number) => {
	// logger.info({GET_BY_MANY_PARAMS: ""});
  const knexDistance = distance
  ? db.raw(`
    ROUND(
      (ST_Distance(
      location::geography,
      ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
      ) / 1000)::numeric,
      2
    ) AS distance`, distance)
  : undefined

  // const fields = 'id, name sex, avatar, age, description, target, city, tags, location'

  const totalFields = fieldsToArr(undefined, 'forms', true)
  const query = requestToForm(undefined, undefined, {name: name as string, params: need})
  knexDistance && totalFields.push(knexDistance)

  logger.info({ZAPROS: query.toSQL().toNative()})

  query.select(totalFields)
  query.limit(LIKES_ON_PAGE)

  if (cursor) {
    query.andWhere('forms.id', '>', cursor)
  }

  const callback = await query

	return callback;
};
