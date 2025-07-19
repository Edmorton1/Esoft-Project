import mainCont from "@app/server/config/containers/container.di"
import TYPES from "@app/server/config/containers/types"
import Utils from "@app/server/infrastructure/helpers/databases/postgres/utils"
import logger from "@app/server/infrastructure/helpers/logger/logger"
import { FormSchema, LikesSchema, MessageSchema, PostsSchema, TagsSchema, UserSchema, UserTagsSchema } from "@app/types/gen/Users"
import { Tables } from "@app/types/gen/types"

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
  posts: PostsSchema
  // tokens: TokenSchema
} as const

type shemaFields<T extends keyof Tables> = Partial<{[K in keyof Tables[T]]: true}>
// type TableKeys<T extends keyof Tables> = keyof Tables[T]

export const getSchemaByTable = <T extends keyof typeof schemas>(table: T, fields?: string): typeof schemas[T] => {
  const utils = mainCont.get<Utils>(TYPES.Utils)
  // console.log(fields, 'fields')
  let parsedFields = utils.fieldsToArr(fields, table);
  if (table === 'forms') {
    parsedFields = parsedFields.map(e => {
      if (typeof e === 'object' && e !== null && 'sql' in e && typeof e.sql === 'string') {
        if (e.sql.includes('location')) {
          return 'location';
        } else if (e.sql.includes('tags')) {
          return 'tags';
        }
      }
      return e;

    }).map(e => {
      if (typeof e === "string") {
        return e.includes('forms.') ? e.split('forms.')[1]: e
      }
      throw new Error("KNEX.RAW ВНТУРИ GET SCHEMA BY TABLE")
    });
    logger.info({ПАРСЕД_ФИЛДС: parsedFields})
  }
  const picked= fields && Object.fromEntries(parsedFields.map(field => [field, true])) as shemaFields<T>

  console.log('pick', picked)

  return picked
    ? (schemas[table] as any).pick(picked)
    : schemas[table]
}