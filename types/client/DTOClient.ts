import { MessageSchema } from "@t/gen/Users";
import {z} from "zod";

// export const RegistrationDTOClientScema = FormDTOCSchemaServer.extend({
//   avatar: z.union([z.instanceof(FileList), z.string()]).optional(),
// });

export const MessageDTOClientSchema = MessageSchema.pick({fromid: true, toid: true, text: true}).extend({
  files: z.custom<FileList>(val => val instanceof FileList).optional(),
});

export const MessagePutDTOClientSchema = MessageSchema.pick({id: true, fromid: true, toid: true, text: true}).extend({
  files: z.object({
    new: z.custom<FileList>(val => val instanceof FileList).nullable(),
    old: z.array(z.string()).nullable(),
  }),
});

export type MessageDTOClient = z.infer<typeof MessageDTOClientSchema>;
export type MessagePutDTOClient = z.infer<typeof MessagePutDTOClientSchema>;