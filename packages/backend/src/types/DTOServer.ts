import { ExpressMulterFileSchema } from "@app/server/types/zodSnippets";
import { PostsDTOBaseSchema } from "@app/types/gen/dtoObjects";
import { MessageSchema, PostsSchema } from "@app/types/gen/Users";
import z from "zod"

export const MessageDTOServerSchema = MessageSchema.pick({fromid: true, toid: true, text: true}).extend({
  files: z.array(ExpressMulterFileSchema)
})

export const MessagePutDTOServerSchema = MessageSchema.pick({fromid: true, text: true}).extend({
  files: z.array(ExpressMulterFileSchema),
  deleted: z.array(z.string()),
});

export const PostsDTOServerSchema = PostsDTOBaseSchema
  .extend({
    files: z.array(ExpressMulterFileSchema).max(3)
  })

export const PostsDTOPutServerSchema = PostsDTOServerSchema
  .extend({
    remove_old: z.array(z.string())
  })

export type MessageDTOServer = z.infer<typeof MessageDTOServerSchema>
export type MessagePutDTOServer = z.infer<typeof MessagePutDTOServerSchema>;
export type PostsDTOServer = z.infer<typeof PostsDTOServerSchema>
export type PostsDTOPutServer = z.infer<typeof PostsDTOPutServerSchema>