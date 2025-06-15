import { RegistrationDTOClientSchemaWithoutRefline } from "@/pages/Registration/widgets/RegistrationWidget/types/RegistrationZOD";
import { UserSchema } from "@t/gen/Users";
import { z } from "zod";

export const AccountSchema = UserSchema.pick({password: true, email: true}).partial()

export type AccountType = z.infer<typeof AccountSchema>

export const ProfileSchema = RegistrationDTOClientSchemaWithoutRefline.omit({
  email: true,
  password: true,
  confirmPassword: true,
  avatar: true
}).extend({
  avatar: z.any()
}).partial()

export type ProfileType = z.infer<typeof ProfileSchema>