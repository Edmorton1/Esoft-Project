import db from "@s/infrastructure/db/db";
import { fieldsToArr } from "@s/infrastructure/db/requests/utils";
import { Form } from "@t/gen/Users";
import { Knex } from "knex";

function requestToForm(fields?: string, params?: Partial<Form>): Knex.QueryBuilder<any> {
  console.log('FIRE requestToForm', { fields, params });

  const rows = [`forms.id`, `forms.name`, `forms.sex`, `forms.age`, `forms.avatar`, `forms.description`, `forms.target`, `forms.city`]

	// const params = {id: "116"};

	let query = db('forms');
  console.log('toNative1', query.toSQL().toNative());

  const parsedFields = fieldsToArr(fields).filter(e => e !== "tags");
	const selectedFields = parsedFields.length > 0 ? parsedFields.map(e => `forms.${e}`).filter(e => e !== `forms.location`) : rows;
	const totalFields = fields?.includes("tags") || parsedFields?.length === 0
    ? [
        ...selectedFields,
        db.raw(`json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags`),
      ]
    : selectedFields;

  totalFields.push(db.raw(`jsonb_build_object(
    'lng', ST_X(location::geometry),
    'lat', ST_Y(location::geometry)
  ) AS location`))

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
  	
  console.log('toNative', query.toSQL().toNative());
  return query
}

export default requestToForm;
