import { Likes } from "@t/gen/Users";
import { LikesDTO } from "@t/gen/dtoObjects";
import { one, toSOSe } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import { clients } from "@s/socket";
import { Request, Response } from "express";
import axios from "axios";
import { logError } from "@shared/DECORATORS";
import logger from "@s/logger";

class HttpLikesController {
  sendLike = async (req: Request, res: Response) => {
    let {fields} = req.query
    fields = String(fields)

    const like: LikesDTO = req.body
    const {userid, liked_userid} = like
    const request = one(await ORM.post(like, 'likes', 'id, liked_userid'))
    logger.info(clients.keys())
    const clientTo = clients.get(liked_userid)
    clientTo?.send(toSOSe('like', request))
    
    res.json(request)
  }

  sendDelete = async (req: Request<{id: number}>, res: Response) => {
    const {id} = req.params
    logger.info(id)
    const request: Likes = one(await ORM.delete(id, 'likes'))
    const clientTo = clients.get(request.liked_userid)
    clientTo?.send(toSOSe('delete_like', request.id))

    res.json(request)
  }

  //УДАЛИТЬ ПОТОМ
  @logError
  async decorator(req: Request, res: Response) {
    const asd = await axios.get('/')
    logger.info(asd.data.asdsad)
  }
}

export default new HttpLikesController