import { lnglatParse } from "@s/infrastructure/endpoints/Likes/validation/Headers.parser";
import { FormSchema, TargetTypeSchema } from "@t/gen/Users";
import { queryBoolean } from "@t/shared/zodSnippets";
import { z } from "zod";

export const zParams = FormSchema
  .pick({target: true, sex: true, city: true})
  .extend({
    target: z.preprocess(val => {
      const parse = TargetTypeSchema.safeParse(val)
      return parse.success ? parse.data : ''
    }, z.string()),
    sex: queryBoolean,
    city: z.coerce.string()
}).partial()

export const zodParams = z.object({
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
  name: z.coerce.string().optional(),

  location: z.preprocess(val => {
    //@ts-ignore
    return lnglatParse(val)
  }, z.tuple([z.coerce.number(), z.coerce.number()]).optional()),

  params: z.preprocess(val => {
    if (typeof val === 'object' && val !== null && Object.keys(val).length === 0) {
      return undefined
    } return val
  }, zParams.optional())
})

export type paramsType = z.infer<typeof zParams>

export type queryType = z.infer<typeof zodParams>

export type tagsTypes = {groups: string, id: number[]}[]