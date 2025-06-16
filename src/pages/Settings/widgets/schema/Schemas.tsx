import { RegistrationDTOClientSchemaWithoutRefline } from "@t/client/RegistrationZOD";
import { PasswordZOD, UserSchema } from "@t/gen/Users";
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

export const PasswordSchema = z.object({
  pass: PasswordZOD,

  new: PasswordZOD,
  repeat: PasswordZOD
}).refine(data => data.new === data.repeat, {message: "Пароли не совпадают", path: ['repeat']})

export type PasswordType = z.infer<typeof PasswordSchema>