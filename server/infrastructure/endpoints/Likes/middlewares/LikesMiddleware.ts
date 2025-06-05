import { LikesDTO, LikesDTOSchema } from "@t/gen/dtoObjects";
import { Request, Response, NextFunction } from "express";

export interface RequestLike extends Request{
  fields: string | undefined,
  likes: LikesDTO
}

class LikesMiddleware {
  sendLike = (req: Request, res: Response, next: NextFunction) => {
    const r = req as RequestLike

    const fields = typeof req.query.fields === 'string' ? req.query.fields : undefined;
    const likesDTO = LikesDTOSchema.parse(req.body)

    r.fields = fields,
    r.likes = likesDTO

    next()
  };
}



export default new LikesMiddleware