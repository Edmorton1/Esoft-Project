import db from "@s/infrastructure/db/db";
import { fieldsToArr } from "@s/infrastructure/db/SQL/utils";
import logger from "@s/helpers/logger/logger";
import { Form } from "@t/gen/Users";
import { Knex } from "knex";
import { lnglatType } from "@t/gen/types";

export const standartToForm = (fields?: string, lnglat?: lnglatType) => {
  let query = db('forms');
  logger.info({sql: query.toSQL().toNative()}, 'toNative1');
  const totalFields = fieldsToArr(fields, 'forms', true, lnglat)

  query = query.select(totalFields)
    .leftJoin("user_tags", "forms.id", "user_tags.id")
    .leftJoin("tags", "user_tags.tagid", "tags.id")
    .groupBy("forms.id")
  return query
}

export const requestToFormParams = (params: Partial<Form>, fields?: string, lnglat?: lnglatType): Knex.QueryBuilder<any> => {
  let query = standartToForm(fields, lnglat)

  const prefixedParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [`forms.${key}`, value]),
  );
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

// function requestToForm(fields?: string, params?: Partial<Form>, manyParams?: {name: string, params: any[]}): Knex.QueryBuilder<any> {

//   let query = standartToForm(fields)

//   if (params) query = requestToFormParams(params, fields)
//   if (manyParams) requestToFormManyParams(manyParams, fields)
  	
//   logger.info({requestToForm: query.toSQL().toNative()});
//   return query
// }

// export default requestToForm;

// import db from "@s/infrastructure/db/db";
// import { fieldsToArr } from "@s/infrastructure/db/requests/utils";
// import logger from "@s/logger";
// import { Form } from "@t/gen/Users";
// import { Knex } from "knex";

// function requestToForm(fields?: string, params?: Partial<Form>, manyParams?: {name: string, params: any[]}): Knex.QueryBuilder<any> {

// 	let query = db('forms');
//   logger.info({sql: query.toSQL().toNative()}, 'toNative1');
//   const totalFields = fieldsToArr(fields, 'forms', true)

//   query = query.select(totalFields)
//     .leftJoin("user_tags", "forms.id", "user_tags.id")
//     .leftJoin("tags", "user_tags.tagid", "tags.id")
//     .groupBy("forms.id")
//     // .whereIn('forms.id', [2, 16, 18])

//   if (params) {
//     const prefixedParams = Object.fromEntries(
//       Object.entries(params).map(([key, value]) => [`forms.${key}`, value]),
//     );
//     query = query.where(prefixedParams)
//   }

//   if (manyParams) {
//     query = query.whereIn('forms.' + manyParams.name, manyParams.params)
//   }
  	
//   logger.info({toNative: query.toSQL().toNative()});
//   return query
// }

// export default requestToForm;
