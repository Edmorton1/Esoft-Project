import Utils from "@app/server/infrastructure/helpers/databases/postgres/utils";
import { assertKnex } from "@app/types/gen/TypeGuardsNode";
import { tables } from "@app/types/gen/types";
import TYPES from "@app/server/config/containers/types";
import appCont from "@app/server/config/containers/appCont.di";

type SqlIncludesType = { sqlincludes: string };
type ResultType = string | SqlIncludesType;

const cases: {
	name: string;
	input: [string, tables];
	includeTags: boolean;
	result: ResultType[];
}[] = [
	{
		name: "Не форма",
		input: ["id, email, password", "users"],
		includeTags: false,
		result: ["id", "email", "password"],
	},
	{
		name: "Форма без tags, location",
		input: ["id, name, sex, age", "forms"],
		includeTags: false,
		result: ["forms.id", "forms.name", "forms.sex", "forms.age"],
	},
	{
		name: "Форма с location и tags (без includeTags)",
		input: ["id, location, tags", "forms"],
		includeTags: false,
		result: ["forms.id", { sqlincludes: "AS location" }, "forms.tags"],
	},
	{
		name: "Форма с location и tags (с includeTags)",
		input: ["id, location, tags", "forms"],
		includeTags: true,
		result: ["forms.id", { sqlincludes: "AS location" }, { sqlincludes: "AS tags" }],
	},
];

describe("[UNIT]: fieldsToArr", () => {
	test.each(cases)("$name", ({ name, input, includeTags, result }) => {
		const utils = appCont.get<Utils>(TYPES.Utils);
		const total = utils.fieldsToArr(input[0], input[1], includeTags);

		total.forEach((e, i) => {
			if (typeof result[i] === "string") {
				expect(e).toStrictEqual(result[i]);
			} else {
				assertKnex(e);
				expect(e.sql.includes(result[i].sqlincludes)).toStrictEqual(true);
			}
		});
	});
});
