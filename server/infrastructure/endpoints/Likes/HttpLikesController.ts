import { Likes } from "@s/core/domain/Users";
import { LikesDTO } from "@s/core/dtoObjects";
import { one, toSO } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import { clients } from "@s/socket";
import { Request, Response } from "express";

class HttpLikesController {
  sendLike = async (req: Request, res: Response) => {
    let {fields} = req.query
    fields = String(fields)

    const like: LikesDTO = req.body
    const {userid, liked_userid} = like
    const request = one(await ORM.post(like, 'likes', 'id, liked_userid'))
    console.log(clients.keys())
    const clientTo = clients.get(liked_userid)
    clientTo?.send(toSO('like', request))
    
    res.json(request)
  }

  sendDelete = async (req: Request<{id: number}>, res: Response) => {
    const {id} = req.params
    console.log(id)
    const request: Likes = one(await ORM.delete(id, 'likes'))
    const clientTo = clients.get(request.liked_userid)
    clientTo?.send(toSO('delete_like', request.id))

    res.json(request)
  }
}

export default new HttpLikesController