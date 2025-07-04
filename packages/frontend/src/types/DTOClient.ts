import { MessageSchema } from "@app/types/gen/Users";
import {z} from "zod";

// files: z.custom<FileList>(val => val instanceof FileList).optional(),

export const MessageDTOClientSchema = MessageSchema.pick({text: true}).extend({
  files: z.instanceof(FileList).optional(),
});

const MessageFilesSchema = z.object({
  // new: z.custom<FileList>(val => val instanceof FileList).nullable(),
  new: z.instanceof(FileList).nullable(),
  old: z.array(z.string()),
})

export const MessagePutDTOClientSchema = MessageSchema.pick({id: true, text: true}).extend({
  files: MessageFilesSchema,
  deleted: z.array(z.string())
});

export type MessageFiles = z.infer<typeof MessageFilesSchema>
export type MessageDTOClient = z.infer<typeof MessageDTOClientSchema>;
export type MessagePutDTOClient = z.infer<typeof MessagePutDTOClientSchema>;