import { ProfileType } from "@/pages/Settings/widgets/schema/Schemas";
import { TagsSchemaDTO } from "@t/gen/dtoObjects";
import { zstrnum } from "@t/gen/Schemas";
import { FormSchema } from "@t/gen/Users";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const ProfileSchema = FormSchema
  .omit({avatar: true, id: true, tags: true})
  .extend({
    tags: z.array(TagsSchemaDTO)
  })
  .partial()

type ProfileSchemaType = z.infer<typeof ProfileSchema>

export interface ReqPass extends Request {
  id: number
  oldPass: string
  newPass: string
}

export interface ReqProf extends Request {
  id: number,
  profile: ProfileSchemaType
}

class HeplersMiddlewares {
  passwordMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const r = req as ReqPass

    const id = zstrnum.parse(req.params.id)
    const oldPass = req.body.old
    const newPass = req.body.new

    r.id = id
    r.oldPass = oldPass
    r.newPass = newPass
    
    next()
  }

  profileMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const r = req as ReqProf

    const id = zstrnum.parse(req.params.id)
    const profile = ProfileSchema.parse(req.body)

    r.id = id
    r.profile = profile

    next()
  }
}

export default new HeplersMiddlewares