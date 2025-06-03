import { fieldsToArr } from "@s/infrastructure/db/requests/utils"
import { FormSchema, LikesSchema, MessageSchema, TagsSchema, TokenSchema, UserSchema, UserTagsSchema } from "@t/gen/Users"
import { Tables } from "@t/gen/types"

// export const MulterFileSchema = z.object({
//   fieldname: z.string(),
//   originalname: z.string(),
//   encoding: z.string(),
//   mimetype: z.string(),
//   size: z.number(),
//   destination: z.string().optional(),
//   filename: z.string().optional(),
//   path: z.string().optional(),
//   buffer: z.any().optional(),
// });

const schemas = {
  users: UserSchema,
  forms: FormSchema,
  likes: LikesSchema,
  messages: MessageSchema,
  tags: TagsSchema,
  user_tags: UserTagsSchema,
  tokens: TokenSchema
} as const

type shemaFields<T extends keyof Tables> = Partial<{[K in keyof Tables[T]]: true}>
type TableKeys<T extends keyof Tables> = keyof Tables[T]

export const getSchemaByTable = <T extends keyof typeof schemas>(table: T, fields?: string): typeof schemas[T] => {

  console.log(fields, 'fields')
  const parsedFields = fieldsToArr(fields, table)
  const picked= fields && Object.fromEntries(parsedFields.map(field => [field, true])) as shemaFields<T>

  console.log('pick', picked)

  return picked
    ? (schemas[table] as any).pick(picked)
    : schemas[table]
}