import { MessageSchema } from "@app/types/gen/Users";
import {ExpressMulterFileSchema} from "@app/types/shared/zodSnippets";
import z from "zod"

export const MessageDTOServerSchema = MessageSchema.pick({fromid: true, toid: true, text: true}).extend({
  files: z.array(ExpressMulterFileSchema)
})

export const MessagePutDTOServerSchema = MessageSchema.pick({fromid: true, text: true}).extend({
  files: z.array(ExpressMulterFileSchema),
  deleted: z.array(z.string()),
});

export type MessageDTOServer = z.infer<typeof MessageDTOServerSchema>
export type MessagePutDTOServer = z.infer<typeof MessagePutDTOServerSchema>;