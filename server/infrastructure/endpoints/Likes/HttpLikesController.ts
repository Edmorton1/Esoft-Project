import { Likes } from "@t/gen/Users";
import { one, toSOSe } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import { clients } from "@s/socket";
import { Request, Response } from "express";
import logger from "@s/logger";
import { RequestLike } from "@s/infrastructure/endpoints/Likes/middlewares/LikesMiddleware";
import { RequestDelete } from "@s/infrastructure/middlewares/DeleteMiddleware";

class HttpLikesController {
  sendLike = async (req: Request, res: Response) => {
    const r = req as RequestLike

    const fields = r.fields
    const likeDTO = r.likes
    
    const request = one(await ORM.post(likeDTO, 'likes', fields))
    logger.info(clients.keys())
    const clientTo = clients.get(r.likes.liked_userid)
    clientTo?.send(toSOSe('like', request))
    
    res.json(request)
  }

  sendDelete = async (req: Request, res: Response) => {
    const r = req as RequestDelete

    logger.info(r.id)

    const request: Likes = one(await ORM.delete(r.id, 'likes'))
    const clientTo = clients.get(request.liked_userid)
    clientTo?.send(toSOSe('delete_like', request.id))

    res.json(request)
  }

  //УДАЛИТЬ ПОТОМ
  // @logError
  // async decorator(req: Request, res: Response) {
  //   const asd = await axios.get('/')
  //   logger.info(asd.data.asdsad)
  // }
}

export default new HttpLikesController