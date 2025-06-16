import { zstrnum } from "@t/gen/Schemas";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export interface ReqPass extends Request {
  id: number
  oldPass: string
  newPass: string
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
}

export default new HeplersMiddlewares