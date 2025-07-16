import { RegistrationDTOSchema } from "@app/types/gen/dtoObjects";
import { remail } from "@app/types/gen/FormErrors";
import { FormSchema, UserSchema } from "@app/types/gen/Users";
import { checkEmptyString, toCapitalize, zstring } from "@app/types/shared/zodSnippets";
import { z } from "zod";

export const RegistrationDTOClientSchemaWithoutRefline = RegistrationDTOSchema.extend({
  email: zstring.email(remail),
  confirmPassword: z.string().nullable(),
  
  name: z.string().trim().nonempty().min(2).transform(val => toCapitalize(val)),
  
  avatar: z.union([z.instanceof(FileList), z.string()]).optional(),

  sex: z.preprocess(val => {
    if (val === 'true') {
      return true
    } else if (val === 'false') {
      return false
    } return val
  }, z.boolean()),

  city: z.string().trim().nonempty("Город обязателен").transform(toCapitalize),

  description: z.preprocess(val => {
    if (checkEmptyString(val)) return val.trim()
    return undefined
  }, z.string().optional())
}).merge(UserSchema.pick({google_id: true}))

export const RegistrationDTOClientSchema = RegistrationDTOClientSchemaWithoutRefline.refine(data => data.password === data.confirmPassword, {message: "Пароли не совпадают", path: ['confirmPassword']});

export type RegistrationDTOClient = z.infer<typeof RegistrationDTOClientSchema>;

export const StoreUserRegistrationSchema = z.object({
  form: FormSchema,
  user: UserSchema,
})

export type StoreUserRegistration = z.infer<typeof StoreUserRegistrationSchema>