import HttpContext from "@app/server/config/express/Http.context";
import z from "zod";

const zparams = z.object({
	code: z.string(),
	scope: z.string(),
	authuser: z.string(),
	prompt: z.string(),
});

export type googleQueryType = z.infer<typeof zparams>

class GoogleValidation {
	getToken = (ctx: HttpContext) => {
		const params = zparams.parse(ctx.query);
		return params;
	};
}

export default new GoogleValidation();
