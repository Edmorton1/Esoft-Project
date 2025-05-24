import { TagsSchemaDTO, UserDTOSchema } from "@t/gen/dtoObjects"
import { FormSchema } from "@t/gen/Users"
import { expressMulter } from "@t/shared/zodSnippets"
import { z } from "zod"

export const RegistrationDTOServerSchema = FormSchema
  .omit({id: true})
  .extend({
  // id: zid.optional(),
  // targetCustom: z.string().optional(), // если раскомментируешь
  avatar: expressMulter.optional(),
  tags: z.array(TagsSchemaDTO),
  })
  .merge(UserDTOSchema)

  export type FormDTOServer = z.infer<typeof RegistrationDTOServerSchema>