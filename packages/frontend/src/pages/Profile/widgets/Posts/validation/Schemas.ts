import { PostsSchema } from "@app/types/gen/Users";
import { z } from "zod";

export const PostsDTOPutClientSchema = PostsSchema.omit({created_at: true})
  .extend({
    files: z.instanceof(FileList),
    remove_old: z.array(z.string()),
  })

export const PostsDTOClientSchema = PostsDTOPutClientSchema.omit({id: true, remove_old: true})
  .extend({files: z.instanceof(FileList)})

export type PostsDTOClient = z.infer<typeof PostsDTOClientSchema>
export type PostsDTOPutClient = z.infer<typeof PostsDTOPutClientSchema>