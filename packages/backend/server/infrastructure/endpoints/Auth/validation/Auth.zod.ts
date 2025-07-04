import { RegistrationDTOSchema, UserDTOSchema } from "@app/types/gen/dtoObjects"
import { ExpressMulterFileSchema } from "@app/types/shared/zodSnippets"
import { z } from "zod"

export const RegistrationDTOServerSchema = RegistrationDTOSchema
  .extend({
  avatar: ExpressMulterFileSchema.optional(),
  })
  .merge(UserDTOSchema)

  export type FormDTOServer = z.infer<typeof RegistrationDTOServerSchema>