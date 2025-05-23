import { UserDTOSchema } from "@t/gen/dtoObjects";
import { FormSchema, MessageSchema } from "@t/gen/Users";
import { expressMulter, zid } from "@t/shared/zodSnippets";
import z from "zod"

export const RegistrationDTOServerSchema = FormSchema
  .omit({id: true})
  .extend({
  // id: zid.optional(),
  // targetCustom: z.string().optional(), // если раскомментируешь
  avatar: expressMulter.optional(),
  tags: z.array(z.string()),
  })
  .merge(UserDTOSchema)

export const MessagePutDTOServerSchema = MessageSchema.pick({fromid: true, toid: true, text: true}).extend({
  files: z.array(expressMulter),
  deleted: z.array(z.string()).optional(),
});

export const MessageDTOServerSchema = MessageSchema.pick({fromid: true, toid: true, text: true}).extend({
  files: z.array(expressMulter)
})

export type FormDTOServer = z.infer<typeof RegistrationDTOServerSchema>
export type MessageDTOServer = z.infer<typeof MessageDTOServerSchema>
export type MessagePutDTOServer = z.infer<typeof MessagePutDTOServerSchema>;