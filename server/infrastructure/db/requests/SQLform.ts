import db from "@s/infrastructure/db/db";
import { fieldsToArr } from "@s/infrastructure/db/requests/utils";
import logger from "@s/logger";
import { Form } from "@t/gen/Users";
import { Knex } from "knex";

function requestToForm(fields?: string, params?: Partial<Form>): Knex.QueryBuilder<any> {

	let query = db('forms');
  logger.info({sql: query.toSQL().toNative()}, 'toNative1');
  const totalFields = fieldsToArr(fields, 'forms', true)

  query = query.select(totalFields)
    .leftJoin("user_tags", "forms.id", "user_tags.id")
    .leftJoin("tags", "user_tags.tagid", "tags.id")
    .groupBy("forms.id")

  if (params) {
    const prefixedParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [`forms.${key}`, value]),
    );
    query = query.where(prefixedParams)
  }
  	
  logger.info({toNative: query.toSQL().toNative()});
  return query
}

export default requestToForm;
