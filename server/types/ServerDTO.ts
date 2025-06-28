import { PostsSchema } from "@t/gen/Users";

export const PostsDTOSchema = PostsSchema
  .omit({id: true, created_at: true})
  .extend({
    files: expressErro[]
  })