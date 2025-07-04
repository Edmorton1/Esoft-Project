import HttpContext from "@s/config/express/Http.context";
import { lnglatParse } from "@s/infrastructure/endpoints/Likes/validation/Headers.parser";
import { XLNGLAT } from "@shared/HEADERS";
import { lnglatType } from "@t/gen/types";
import { zid } from "@t/shared/zodSnippets";
import { z } from "zod";

class FormValidation {
	searchForm = (ctx: HttpContext): [string, lnglatType | undefined] => {
		const search = z.coerce
			.string()
			.toLowerCase()
			.trim()
			.parse(ctx.params.search);
		const lnglat = lnglatParse(ctx.headers(XLNGLAT));

		return [search, lnglat];
	};

  profileGet = (ctx: HttpContext): [number, lnglatType | undefined] => {
    const lnglat = lnglatParse(ctx.headers(XLNGLAT))
    const id = zid.parse(ctx.params.id)
    return [id, lnglat]
  }
}

export default new FormValidation();
