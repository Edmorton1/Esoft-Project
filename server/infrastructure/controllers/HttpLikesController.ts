import { LikesDTO } from "@s/core/dtoObjects";
import { one, toSO } from "@s/infrastructure/db/Mappers";
import { ORM } from "@s/infrastructure/db/ORM";
import { clients } from "@s/socket";
import { Request, Response } from "webpack-dev-server";

export class HttpLikesController {
  constructor (
    readonly ORM: ORM
  ) {}

  sendLike = async (req: Request, res: Response) => {
    const like: LikesDTO = req.body
    const {userid, liked_userid} = like
    const request = one(await this.ORM.post(like, 'likes'))
    console.log(clients.keys())
    const clientTo = clients.get(liked_userid)
    clientTo?.send(toSO('like', request))
    
    res.json(request)
  }
}