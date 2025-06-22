import { TagsSchemaDTO } from "@t/gen/dtoObjects";
import { FormSchema } from "@t/gen/Users";
import { Request } from "express";
import { z } from "zod";

const ProfileSchema = FormSchema
  .omit({avatar: true, id: true, tags: true})
  .extend({
    tags: z.array(TagsSchemaDTO)
  })
  .partial()

type ProfileSchemaType = z.infer<typeof ProfileSchema>

class SettingsValidation {
  password = (req: Request): [string, string] => {
    const oldPass = req.body.old
    const newPass = req.body.new
    
    return [oldPass, newPass]
  }

  profile = (req: Request): ProfileSchemaType => {
    const profile = ProfileSchema.parse(req.body)

    return profile
  }
}

export default new SettingsValidation