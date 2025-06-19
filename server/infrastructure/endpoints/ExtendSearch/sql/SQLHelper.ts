import db from "@s/infrastructure/db/db";
import {paramsType, tagsTypes} from "@s/infrastructure/endpoints/ExtendSearch/middlewares/Schemas";
import logger from "@s/logger";
import {Knex} from "knex";

class SQLHelper {
	getUserTags = async (tags: string[]): Promise<tagsTypes> => {
		logger.info("GET USER TAGS");
		const placeholders = tags.map(() => "?").join(",");
		const sql = `
    WITH input_words AS (
      SELECT unnest(ARRAY[${placeholders}]) AS word
    ),
    matched_tags AS (
      SELECT 
        iw.word AS groups,
        t.id,
        t.tag,
        similarity(t.tag, iw.word) AS sim
      FROM input_words iw
      JOIN tags t ON t.tag % iw.word
    )

    SELECT 
      groups,
      json_agg(id ORDER BY sim DESC) AS id
    FROM matched_tags
    GROUP BY groups;
    `;

		const request = db.raw(sql, [...tags]);

		logger.info({toNativeUserTags: request.toSQL().toNative()});

		return (await request).rows;
	};

	toSQLgetByTags = (tags: tagsTypes): string =>
		tags
			.map(
				e => `
      COUNT(
        DISTINCT CASE
          WHEN user_tags.tagid
          IN (${e.id.join(",")})
          THEN user_tags.tagid END
      ) > 0
    `,
			)
			.join(" AND ");

	toSQLWhere = (props?: paramsType): Knex.Raw | null => {
		if (!props) return null;

		const entries = Object.entries(props).filter(
			([k, v]) => v !== "" && v !== undefined,
		);
		if (entries.length === 0) return null;

		const conditions = entries.map(([key]) => `${key} = ?`).join(" AND ");
		const values = entries.map(([, value]) => value);

		return db.raw(conditions, values);
	};
}

export default new SQLHelper;
