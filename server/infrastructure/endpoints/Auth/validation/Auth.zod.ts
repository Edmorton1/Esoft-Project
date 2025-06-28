import { TagsSchemaDTO, UserDTOSchema } from "@t/gen/dtoObjects"
import { FormSchema } from "@t/gen/Users"
import { ExpressMulterFileSchema } from "@t/shared/zodSnippets"
import { z } from "zod"

export const RegistrationDTOServerSchema = FormSchema
  .omit({id: true, last_active: true})
  .extend({
  // id: zid.optional(),
  // targetCustom: z.string().optional(), // если раскомментируешь
  avatar: ExpressMulterFileSchema.optional(),
  tags: z.array(TagsSchemaDTO).transform(item => item.map((val: {tag: string}) => ({tag: val.tag.toLowerCase()}))),
  city: z.string().optional().transform(val => {
    if (typeof val === 'string') {
      return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    } return val
    })
  })
  .merge(UserDTOSchema)

  export type FormDTOServer = z.infer<typeof RegistrationDTOServerSchema>