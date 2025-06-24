import db from "@s/infrastructure/db/db";
import { requestToFormManyParams, standartToForm } from "@s/infrastructure/db/SQL/SQLform";
import { fieldsToArr } from "@s/infrastructure/db/SQL/utils";
import logger from "@s/helpers/logger";
import { LIKES_ON_PAGE } from "@shared/CONST";
import { lnglatType } from "@t/gen/types";
import { Knex } from "knex";

interface LikesModuleRepo {
	getLikedIds: (userid: number) => Knex.QueryBuilder<any>
  getManyByParam: (name: string, need: any[], distance?: lnglatType, cursor?: number) => Knex.QueryBuilder<any>,
  getPairs: (id: number) => Knex.QueryBuilder<any>
}

class LikesModule implements LikesModuleRepo {
	getLikedIds = (userid: number) => {
	// SELECT json_agg(likes.userid) as forms FROM likes
	// LEFT JOIN likes as likes2 
	// 	ON likes.userid = likes2.liked_userid
	// 	AND likes.liked_userid = likes2.userid
	// WHERE likes.liked_userid = 16
	// 	AND likes2.id is NULL
	const query = db(`likes`)
		.select(db.raw(`json_agg(likes.userid)`))
		.from(`likes`)
		.leftJoin("likes as likes2", function () {
			this.on("likes.userid", "=", "likes2.liked_userid");
			this.andOn("likes.liked_userid", "=", "likes2.userid")
		})
		.where("likes.liked_userid", "=", userid)
		.andWhereRaw("likes2.id IS NULL")

	logger.info({getLikedIds: query.toSQL().toNative()})
	return query
	}

	getManyByParam: LikesModuleRepo["getManyByParam"] = (
		name,
		need,
		distance,
		cursor,
	) => {
		// logger.info({GET_BY_MANY_PARAMS: ""});
		const knexDistance = distance
			? db.raw(
					`
      ROUND(
        (ST_Distance(
        location::geography,
        ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
        ) / 1000)::numeric,
        2
      ) AS distance`,
					distance,
				)
			: undefined;

		// const fields = 'id, name sex, avatar, age, description, target, city, tags, location'

		//@ts-ignore
		// ТУТ НАДО БУДЕТ ПОТОМ СДЕЛАТЬ ЧТОБЫ ОН ФИЛЬТРОВАЛ НЕ ПО ID, А ПО СОЗДАНИИ ЛАЙКА

		const totalFields = fieldsToArr(undefined, "forms", true);
		const query = requestToFormManyParams({
			name: name as string,
			params: need,
		})
			.select(totalFields)
			.limit(LIKES_ON_PAGE)
			.orderBy("id")
		knexDistance && totalFields.push(knexDistance);

		logger.info({ ZAPROS: query.toSQL().toNative() });

		if (cursor) {
			query.andWhere("forms.id", ">", cursor);
		}

		return query;
	};

	getPairs: LikesModuleRepo["getPairs"] = id => {
		const baseQuery = standartToForm();
		const query = db("likes")
			.select("forms.*")
			.leftJoin(baseQuery.as("forms"), "forms.id", "likes.liked_userid")
			.leftJoin("likes as likes2", function () {
				this.on("likes.userid", "=", "likes2.liked_userid").andOn(
					"likes.liked_userid",
					"likes2.userid",
				);
			})
			.where("likes.userid", id)
			.whereNotNull("likes2.id")
			.orderBy("likes.created_at", "desc");

		logger.info({ QUERY_SQL: query.toSQL().toNative() });

		return query;
	};
}

export default LikesModule;

// ------------ ПОЛУЧИТЬ ВЗАИМНЫЕ ЛАЙКИ
// SELECT likes.userid, likes.liked_userid
// FROM likes
// JOIN likes AS likes2
//   ON likes.userid = likes2.liked_userid
//  AND likes.liked_userid = likes2.userid
// WHERE likes.userid = 16

// ------------- ПОЛУЧИТЬ ФОРМЫ ПО ВЗАИМНЫМ ЛАЙКАМ
// SELECT
//   forms.id,
//   forms.name,
//   forms.sex,
//   forms.age,
//   forms.avatar,
//   forms.description,
//   forms.target,
//   forms.city,
//   forms.last_active,
//   -- forms.title,
//   jsonb_build_object(
//     'lng', ST_X(location::geometry),
//     'lat', ST_Y(location::geometry)
//   ) AS location,
//   json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags
// FROM likes
// JOIN likes AS likes2
//   ON likes.userid = likes2.liked_userid
//  AND likes.liked_userid = likes2.userid

// LEFT JOIN forms ON forms.id = likes.liked_userid
// LEFT JOIN user_tags ON forms.id = user_tags.id
// LEFT JOIN tags ON user_tags.tagid = tags.id

// WHERE likes.userid = 16

// GROUP BY forms.id;

// ------- ПОЛУЧИТЬ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ КОТОРЫЕ ЛАЙКНУЛИ, КОТОРЫХ ТЫ НЕ ЛАЙКАЛ
// SELECT json_agg(likes.userid) as forms FROM likes
// LEFT JOIN likes as likes2 
// 	ON likes.userid = likes2.liked_userid
// 	AND likes.liked_userid = likes2.userid
// WHERE likes.liked_userid = 16
// 	AND likes2.id is NULL