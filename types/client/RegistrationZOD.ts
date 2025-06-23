import { RegistrationDTOServerSchema } from "@s/infrastructure/endpoints/Auth/validation/Auth.zod";
import { FormSchema, UserSchema } from "@t/gen/Users";
import { checkEmptyString, toCapitalize, zstring } from "@t/shared/zodSnippets";
import { z } from "zod";

export const RegistrationDTOClientSchemaWithoutRefline = RegistrationDTOServerSchema.extend({
  email: zstring.email(),
  confirmPassword: z.string(),
  
  name: z.string().trim().nonempty().min(2).transform(val => toCapitalize(val)),
  
  avatar: z.union([z.instanceof(FileList), z.string()]).optional(),

  sex: z.preprocess(val => {
    if (val === 'true') {
      return true
    } else if (val === 'false') {
      return false
    } return val
  }, z.boolean()),

  // tags: z.preprocess(val => {
  //   if (checkEmptyString(val)) {
  //     const tags = val.split(',').map(e => e.trim().toLowerCase()).filter(e => e !== '' && e)
  //     return Array.from(new Set(tags)).map(e => ({tag: e}))
  //   }
  //   return []
  // }, z.array(TagsSchemaDTO)),

  // tags: z.preprocess(val => {
  //   if (Array.isArray(val) && val.every(e => typeof e === 'string')) {
  //     return val.map(e => e.trim().toLowerCase())
  //   } return val
  // }, z.array(TagsSchemaDTO)),

  city: z.preprocess(val => {
    if (checkEmptyString(val)) return toCapitalize(val)
    return undefined
  }, z.string().trim().nonempty().optional()),

  description: z.preprocess(val => {
    if (checkEmptyString(val)) return val.trim()
    return undefined
  }, z.string().optional())
})

export const RegistrationDTOClientSchema = RegistrationDTOClientSchemaWithoutRefline.refine(data => data.password === data.confirmPassword, {message: "Пароли не совпадают", path: ['confirmPassword']});

export type RegistrationDTOClient = z.infer<typeof RegistrationDTOClientSchema>;

export const StoreUserRegistrationSchema = z.object({
  form: FormSchema,
  user: UserSchema,
})

export type StoreUserRegistration = z.infer<typeof StoreUserRegistrationSchema>