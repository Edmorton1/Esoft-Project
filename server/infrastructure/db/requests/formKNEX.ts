import { db } from "@s/infrastructure/db/db";
import { fieldsToArr } from "@s/infrastructure/db/requests/utils";
import { Form } from "@t/gen/Users";
import { Knex } from "knex";

function requestToForm(fields?: string, params?: Partial<Form>): Knex.QueryBuilder<any> {
	// const params = {id: "116"};

	let query = db('forms');

  const parsedFields = fieldsToArr(fields).filter(e => e !== "tags");
	const selectedFields = parsedFields.length > 0 ? parsedFields.map(e => `forms.${e}`) : ["forms.*"];
	const totalFields = fields?.includes("tags") || parsedFields?.length === 0
    ? [
        ...selectedFields,
        db.raw(`json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags`),
      ]
    : selectedFields;

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
  	
  console.log(query.toSQL().toNative());
  return query
}

export default requestToForm;
