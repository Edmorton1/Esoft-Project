import { MessageSchema } from "@t/gen/Users";
import { expressMulter, zid } from "@t/shared/zodSnippets";
import z from "zod"

export const MessageDTOServerSchema = MessageSchema.pick({fromid: true, toid: true, text: true}).extend({
  files: z.array(expressMulter)
})

export const MessagePutDTOServerSchema = MessageSchema.pick({fromid: true, toid: true, text: true}).extend({
  files: z.array(expressMulter),
  deleted: z.array(z.string()).optional(),
});

export type MessageDTOServer = z.infer<typeof MessageDTOServerSchema>
export type MessagePutDTOServer = z.infer<typeof MessagePutDTOServerSchema>;