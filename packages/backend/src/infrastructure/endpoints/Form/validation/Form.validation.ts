import HttpContext from "@app/server/config/express/Http.context";
import { lnglatParse } from "@app/server/infrastructure/endpoints/Likes/validation/Headers.parser";
import { XLNGLAT } from "@app/shared/HEADERS";
import { lnglatType } from "@app/types/gen/types";
import { zid } from "@app/types/shared/zodSnippets";
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
