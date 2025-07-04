import HttpContext from "@s/config/express/Http.context";
import { TagsSchemaDTO } from "@t/gen/dtoObjects";
import { FormSchema } from "@t/gen/Users";
import { z } from "zod";

const ProfileSchema = FormSchema
  .omit({avatar: true, id: true, tags: true})
  .extend({
    tags: z.array(TagsSchemaDTO)
  })
  .partial()

export type ProfileSchema = z.infer<typeof ProfileSchema>

class SettingsValidation {
  password = (ctx: HttpContext): [string, string] => {
    const oldPass = ctx.body.old
    const newPass = ctx.body.new
    
    return [oldPass, newPass]
  }

  profile = (ctx: HttpContext): ProfileSchema => {
    const profile = ProfileSchema.parse(ctx.body)

    return profile
  }
}

export default new SettingsValidation