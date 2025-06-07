import db from "@s/infrastructure/db/db";
import requestToForm from "@s/infrastructure/db/requests/SQLform";
import { fieldsToArr } from "@s/infrastructure/db/requests/utils";
import logger from "@s/logger";
import { lnglatType, Tables, tables } from "@t/gen/types";

// export const getManyByParam = async <T extends tables>(param: keyof Tables[T], need: any[], table: T, fields?: string) => {
export const getManyByParam = async <T extends tables>(name: keyof Tables[T], need: any[], distance?: lnglatType) => {
	logger.info({GET_BY_MANY_PARAMS: ""});

	// let callback = undefined;

	// if (table === "forms") {
	// 	callback = async () =>
	// 		requestToForm(fields, undefined, {name: param as string, params: need});
	// } else {
	// 	callback = async () => await db(table).select(fieldsToArr(fields, table));
	// }
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

  query.select(totalFields)

  const callback = await query

	return callback;
};
