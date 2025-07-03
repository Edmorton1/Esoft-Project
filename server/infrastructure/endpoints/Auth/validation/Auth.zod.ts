import { RegistrationDTOSchema, UserDTOSchema } from "@t/gen/dtoObjects"
import { ExpressMulterFileSchema } from "@t/shared/zodSnippets"
import { z } from "zod"

export const RegistrationDTOServerSchema = RegistrationDTOSchema
  .extend({
  avatar: ExpressMulterFileSchema.optional(),
  })
  .merge(UserDTOSchema)

  export type FormDTOServer = z.infer<typeof RegistrationDTOServerSchema>