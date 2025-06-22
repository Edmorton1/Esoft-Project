import {Request} from "express";
import { z } from "zod";

class FormValidation {
	searchForm = (req: Request): string => {
    const search = z.coerce.string().toLowerCase().trim().parse(req.params.search)
    
    return search
	};
}

export default new FormValidation();
