import StoreForm from "@/shared/stores/Store-Form";
import { RegistrationDTOClientSchemaWithoutRefline } from "@/types/RegistrationZOD";
import { PasswordZOD, Tags, UserSchema } from "@t/gen/Users";
import { z } from "zod";

export function tagsParse(tags?: (Tags | Omit<Tags, 'id'>)[]) {
  return JSON.stringify(tags?.map(e => e.tag).sort((a, b) => a.localeCompare(b)))
}

export const AccountSchema = UserSchema.pick({password: true, email: true}).partial()

export type AccountType = z.infer<typeof AccountSchema>

const ProfileSchemaWithoutTransform = RegistrationDTOClientSchemaWithoutRefline.omit({
  email: true,
  password: true,
  confirmPassword: true,
  avatar: true
}).extend({
  avatar: z.any()
}).partial()

export const ProfileSchema = ProfileSchemaWithoutTransform.transform((data) => {
  type keys = keyof typeof data

  return Object.fromEntries(
    Object.entries(data)
    .filter(([key, data]) => {
      const value = data
      const orig = StoreForm.form?.[key as keys]
      console.log(value, orig)

      if (Array.isArray(value)) return tagsParse(value) !== tagsParse(orig as any[]);
      if (typeof data === 'object') return JSON.stringify(data) !== JSON.stringify(orig);
      return value !== orig
    })
  )
})

export type ProfileType = z.infer<typeof ProfileSchemaWithoutTransform>

export const PasswordSchema = z.object({
  pass: PasswordZOD,

  new: PasswordZOD,
  repeat: PasswordZOD
}).refine(data => data.new === data.repeat, {message: "Пароли не совпадают", path: ['repeat']})

export type PasswordType = z.infer<typeof PasswordSchema>

  // const total: Partial<ProfileType> = {}
  // type Keys = Array<keyof typeof data>

  // const keys = Object.keys(data) as Keys
  // keys.forEach(e => {
  //   const value = data[e]
  //   const orig = StoreForm.form?.[e]

  //   if (Array.isArray(value) && tagsParse(value) === tagsParse(orig as any[])) return;
  //   if (value === orig) return;
  //   total[e] = value
  // })