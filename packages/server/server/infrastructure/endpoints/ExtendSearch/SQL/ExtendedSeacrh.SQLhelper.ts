import TYPES from "@s/config/containers/types";
import { ILogger } from "@s/helpers/logger/logger.controller";
import db from "@s/infrastructure/db/db";
import {paramsType, tagsTypes} from "@s/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.schemas";
import { inject, injectable } from "inversify";
import {Knex} from "knex";

interface ExtendedSeacrhSQLhelperRepo {
  getUserTags: (tags: string[]) => Promise<tagsTypes>,
  toSQLgetByTags: (tags: tagsTypes) => string,
  // toSQLWhere: (props?: paramsType) => Knex.Raw | null
}

@injectable()
class ExtendedSeacrhSQLhelper implements ExtendedSeacrhSQLhelperRepo {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
  ) {}
	getUserTags: ExtendedSeacrhSQLhelperRepo['getUserTags'] = async (tags) => {
		this.logger.info("GET USER TAGS");
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

		this.logger.info({toNativeUserTags: request.toSQL().toNative()});

		return (await request).rows;
	};

	toSQLgetByTags: ExtendedSeacrhSQLhelperRepo['toSQLgetByTags'] = (tags) =>
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

	// toSQLWhere: ExtendedSeacrhSQLhelperRepo['toSQLWhere'] = (props) => {
	// 	if (!props) return null;

	// 	const entries = Object.entries(props).filter(
	// 		([k, v]) => v !== "" && v !== undefined,
	// 	);
	// 	if (entries.length === 0) return null;

	// 	const conditions = entries.map(([key]) => `${key} = ?`).join(" AND ");
	// 	const values = entries.map(([, value]) => value);

	// 	return db.raw(conditions, values);
	// };
}

export default ExtendedSeacrhSQLhelper;
