import HttpContext from "@s/config/express/Http.context";
import { z } from "zod";

class FormValidation {
	searchForm = (ctx: HttpContext): string => {
    const search = z.coerce.string().toLowerCase().trim().parse(ctx.params.search)
    
    return search
	};
}

export default new FormValidation();
