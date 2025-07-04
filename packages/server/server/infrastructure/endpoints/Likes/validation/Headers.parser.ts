import { lnglatType } from "@t/gen/types";
import { z } from "zod";

export const lnglatParse = (
	value: string | string[] | undefined,
): lnglatType | undefined => {
	if (typeof value === "string") {
		try {
			const lnglat = JSON.parse(value);
			return z.tuple([z.number(), z.number()]).parse(lnglat);
		} catch (err) {
			console.log(err);
			return undefined;
		}
	}
};
