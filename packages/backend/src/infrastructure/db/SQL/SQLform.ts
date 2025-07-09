import db from "@app/server/infrastructure/db/db";
import { fieldsToArr } from "@app/server/infrastructure/db/SQL/utils";
import logger from "@app/server/helpers/logger/logger";
import { Form } from "@app/types/gen/Users";
import { Knex } from "knex";
import { lnglatType } from "@app/types/gen/types";

export const standartToForm = (fields?: string, lnglat?: lnglatType) => {
  let query = db('forms');
  logger.info({sql: query.toSQL().toNative()}, 'toNative1');
  const totalFields = fieldsToArr(fields, 'forms', true, lnglat)
  logger.info({TOTAL_FIELDS: totalFields})

  query = query.select(totalFields)
    .leftJoin("user_tags", "forms.id", "user_tags.id")
    .leftJoin("tags", "user_tags.tagid", "tags.id")
    .groupBy("forms.id")
  return query
}

export const requestToFormParams = (params: Partial<Form>, fields?: string, lnglat?: lnglatType): Knex.QueryBuilder<any> => {
  let query = standartToForm(fields, lnglat)
  logger.info({SQLFORM: {params, fields}})

  const prefixedParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [`forms.${key}`, value]),
  );
  logger.info({PREFIEXED_PARAMS: prefixedParams})
  query = query.where(prefixedParams)

  logger.info({requestToFormParams: query.toSQL().toNative()});
  return query
}

export const requestToFormManyParams = (manyParams: {name: string, params: any[]}, fields?: string): Knex.QueryBuilder<any> => {
  let query = standartToForm(fields)
  query = query.whereIn('forms.' + manyParams.name, manyParams.params)

  logger.info({requestToFormManyParams: query.toSQL().toNative()});
  return query
}

export const requestToLike = (params: {name: keyof Form, param: string}, fields?: string, lnglat?: lnglatType): Knex.QueryBuilder<any> => {
  const {name, param} = params
  let query = standartToForm(fields, lnglat)

  query = query.whereILike(name, `%${param}%`)
  
  logger.info({requestToLike: query.toSQL().toNative()});
  return query
}

// class SQLForm {
// 	standartToForm = (fields?: string, lnglat?: lnglatType) => {
// 		let query = db("forms");
// 		logger.info({ sql: query.toSQL().toNative() }, "toNative1");
// 		const totalFields = fieldsToArr(fields, "forms", true, lnglat);
// 		logger.info({ TOTAL_FIELDS: totalFields });

// 		query = query
// 			.select(totalFields)
// 			.leftJoin("user_tags", "forms.id", "user_tags.id")
// 			.leftJoin("tags", "user_tags.tagid", "tags.id")
// 			.groupBy("forms.id");
// 		return query;
// 	};

// 	requestToFormParams = (
// 		params: Partial<Form>,
// 		fields?: string,
// 		lnglat?: lnglatType,
// 	): Knex.QueryBuilder<any> => {
// 		let query = this.standartToForm(fields, lnglat);
// 		logger.info({ SQLFORM: { params, fields } });

// 		const prefixedParams = Object.fromEntries(
// 			Object.entries(params).map(([key, value]) => [`forms.${key}`, value]),
// 		);
// 		logger.info({ PREFIEXED_PARAMS: prefixedParams });
// 		query = query.where(prefixedParams);

// 		logger.info({ requestToFormParams: query.toSQL().toNative() });
// 		return query;
// 	};

// 	requestToFormManyParams = (
// 		manyParams: { name: string; params: any[] },
// 		fields?: string,
// 	): Knex.QueryBuilder<any> => {
// 		let query = this.standartToForm(fields);
// 		query = query.whereIn("forms." + manyParams.name, manyParams.params);

// 		logger.info({ requestToFormManyParams: query.toSQL().toNative() });
// 		return query;
// 	};

// 	requestToLike = (
// 		params: { name: keyof Form; param: string },
// 		fields?: string,
// 		lnglat?: lnglatType,
// 	): Knex.QueryBuilder<any> => {
// 		const { name, param } = params;
// 		let query = this.standartToForm(fields, lnglat);

// 		query = query.whereILike(name, `%${param}%`);

// 		logger.info({ requestToLike: query.toSQL().toNative() });
// 		return query;
// 	};
// }