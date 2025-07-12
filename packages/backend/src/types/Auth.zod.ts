import { ExpressMulterFileSchema } from "@app/server/types/zodSnippets"
import { RegistrationDTOSchema, UserDTOSchema } from "@app/types/gen/dtoObjects"
import { UserSchema } from "@app/types/gen/Users"
import { z } from "zod"

export const RegistrationDTOServerSchema = RegistrationDTOSchema
  .extend({
  avatar: ExpressMulterFileSchema.optional(),
  })
  .merge(UserDTOSchema)
  .merge(UserSchema.pick({google_id: true}))

  export type FormDTOServer = z.infer<typeof RegistrationDTOServerSchema>