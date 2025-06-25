import HttpContext from "@s/infrastructure/express/Http.context";
import { z } from "zod";

class SharedMiddlewares {
	OnlyIdMiddleware = (ctx: HttpContext) => {
		const id = z.coerce.number().parse(ctx.params.id);
		ctx.par_id = id;

		ctx.next();
	}
};


export default new SharedMiddlewares