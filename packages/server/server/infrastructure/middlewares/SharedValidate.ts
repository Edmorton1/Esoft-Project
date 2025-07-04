import HttpContext from "@s/config/express/Http.context";
import { z } from "zod";

class SharedValidate {
	OnlyId = (ctx: HttpContext): number => {
		const id = z.coerce.number().parse(ctx.params.id);

		return id;
	}
};


export default new SharedValidate