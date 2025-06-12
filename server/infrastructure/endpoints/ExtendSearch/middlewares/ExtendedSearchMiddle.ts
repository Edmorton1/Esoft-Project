import logger from "@s/logger";
import { FormSchema, TargetTypeSchema } from "@t/gen/Users";
import { queryBoolean } from "@t/shared/zodSnippets";
import {Request, Response, NextFunction} from "express";
import { z } from "zod";

const zParams = FormSchema
  .pick({target: true, sex: true, city: true})
  .extend({
    target: z.preprocess(val => {
      const parse = TargetTypeSchema.safeParse(val)
      return parse.success ? parse.data : ''
    }, z.string()),
    sex: queryBoolean,
    city: z.coerce.string()
}).partial()

const zodParams = z.object({
  // tags: z.coerce.string().trim().nonempty().optional(),
  tags: z.preprocess(val => {
    if (typeof val === 'string') {
      const result = val.split(',').map(e => e.trim())
      if (result.length === 1 && result[0] === '') {
        return undefined
      } return result
    }
  }, z.array(z.string().trim().nonempty()).optional()),

  min_age: z.coerce.number().optional(),
  max_age: z.coerce.number().optional(),
  page: z.coerce.number().transform(val => val !== 0 ? val : 1).optional(),
  avatar: queryBoolean,
  max_distance: z.coerce.number().optional(),

  location: z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return JSON.parse(val)
      } catch {
        return undefined
      }
    } return undefined
  }, z.tuple([z.coerce.number(), z.coerce.number()]).optional()),

  params: z.preprocess(val => {
    if (typeof val === 'object' && val !== null && Object.keys(val).length === 0) {
      return undefined
    } return val
  }, zParams.optional())
})

export type paramsType = z.infer<typeof zParams>

export type queryType = z.infer<typeof zodParams>

export interface ExtendedParamsInterface extends Request {
  filters: queryType
}

function ExtendedSearchMiddle(req: Request, res: Response, next: NextFunction) {
  const r = req as ExtendedParamsInterface
  const {tags, min_age, max_age, page, avatar, location, max_distance, ...params} = req.query

  const parsed = zodParams.parse({tags, min_age, max_age, page, avatar, location, max_distance, params})

  logger.debug({ПАРАМЕТРЫ_EXT_SEARCH: parsed})
  
  r.filters = parsed

  next()
}

export default ExtendedSearchMiddle;
