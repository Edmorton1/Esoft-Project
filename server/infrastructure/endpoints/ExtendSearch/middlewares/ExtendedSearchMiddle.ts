import logger from "@s/logger";
import { lnglatType } from "@t/gen/types";
import { FormSchema } from "@t/gen/Users";
import {Request, Response, NextFunction} from "express";
import { z } from "zod";

export interface ExtendedParamsInterface extends Request {
  body: {
    tags?: string;
    params?: any;
    min_age?: number;
    max_age?: number;
    page?: number;
    avatar?: boolean;
    location?: lnglatType;
    max_distance?: number;
  }

}

function ExtendedSearchMiddle(req: Request, res: Response, next: NextFunction) {
  const r = req as ExtendedParamsInterface
  const {tags, min_age, max_age, page, avatar, location, max_distance, ...params} = req.body
  const parsed = {
    tags: z.string().trim().nonempty().optional().parse(tags),
    min_age: z.coerce.number().optional().parse(min_age),
    max_age: z.coerce.number().optional().parse(max_age),
    page: z.coerce.number().optional().parse(page),
    avatar: z.coerce.boolean().optional().parse(avatar),
    location: z.tuple([z.coerce.number(), z.coerce.number()]).optional().parse(location),
    max_distance: z.coerce.number().optional().parse(max_distance),
    params: FormSchema.partial().optional().parse(params)
  }

  logger.info({ПАРАМЕТРЫ_EXT_SEARCH: {tags, params, min_age, max_age, page, avatar, location, max_distance}})
  
  r.body = parsed

  next()
}

export default ExtendedSearchMiddle;
