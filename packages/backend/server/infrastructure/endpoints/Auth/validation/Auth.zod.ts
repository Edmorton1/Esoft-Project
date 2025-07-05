import { ExpressMulterFileSchema } from "@app/server/types/zodSnippets"
import { RegistrationDTOSchema, UserDTOSchema } from "@app/types/gen/dtoObjects"
import { z } from "zod"

export const RegistrationDTOServerSchema = RegistrationDTOSchema
  .extend({
  avatar: ExpressMulterFileSchema.optional(),
  })
  .merge(UserDTOSchema)

  export type FormDTOServer = z.infer<typeof RegistrationDTOServerSchema>