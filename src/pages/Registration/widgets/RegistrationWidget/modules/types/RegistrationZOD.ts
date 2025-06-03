import StoreRegistration from "@/pages/Registration/widgets/stores/Store-Registration";
import { RegistrationDTOServerSchema } from "@s/infrastructure/endpoints/Token/services/validation/RegistrationZOD";
import { TagsSchemaDTO } from "@t/gen/dtoObjects";
import { FormSchema, UserSchema } from "@t/gen/Users";
import { checkEmptyString, toCapitalize, zstring } from "@t/shared/zodSnippets";
import { z } from "zod";

export const RegistrationDTOClientSchema = RegistrationDTOServerSchema.extend({
  email: zstring.email(),
  confirmPassword: z.string(),
  
  name: z.string().trim().nonempty().min(2).transform(val => toCapitalize(val)),
  
  avatar: z.union([z.instanceof(FileList), z.string()]).optional(),

  sex: z.preprocess(val => Boolean(val), z.boolean()),

  tags: z.preprocess(val => {
    if (checkEmptyString(val)) {
      const tags = val.split(',').map(e => e.trim().toLowerCase()).filter(e => e !== '' && e)
      return Array.from(new Set(tags)).map(e => ({tag: e}))
    }
    return []
  }, z.array(TagsSchemaDTO)),

  city: z.preprocess(val => {
    if (checkEmptyString(val)) return toCapitalize(val)
    return undefined
  }, z.string().trim().nonempty().optional()),

  description: z.preprocess(val => {
    if (checkEmptyString(val)) return val.trim()
    return undefined
  }, z.string().optional())
}).refine(data => data.password === data.confirmPassword, {message: "Пароли не совпадают", path: ['confirmPassword']});

export type RegistrationDTOClient = z.infer<typeof RegistrationDTOClientSchema>;

export const StoreUserRegistrationSchema = z.object({
  form: FormSchema,
  user: UserSchema,
  accessToken: z.string()
})

export type StoreUserRegistration = z.infer<typeof StoreUserRegistrationSchema>