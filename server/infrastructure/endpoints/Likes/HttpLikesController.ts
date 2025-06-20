import { Likes } from "@t/gen/Users";
import { one } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/SQL/ORM";
import { clients } from "@s/helpers/WebSocket/socket";
import { Request, Response } from "express";
import logger from "@s/helpers/logger";
import { RequestGet, RequestLike } from "@s/infrastructure/endpoints/Likes/middlewares/LikesMiddleware";
import { RequestOnlyId } from "@s/infrastructure/middlewares/SharedMiddlewares";
import { getManyByParam } from "@s/infrastructure/endpoints/Likes/sql/SQLLikes";
import { toSOSe } from "@s/helpers/WebSocket/JSONParsers";

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
    const r = req as RequestOnlyId

    logger.info(r.id)

    const request: Likes = one(await ORM.delete(r.id, 'likes'))
    const clientTo = clients.get(request.liked_userid)
    clientTo?.send(toSOSe('delete_like', request.id))

    res.json(request)
  }

  likesGet = async (req: Request, res: Response) => {
    const r = req as RequestGet

    logger.info({riad: r.id})
    const ids = (await ORM.getByParams({liked_userid: r.id}, 'likes', 'userid')).map(e => e.userid)
    logger.info({ids})

    const response = await getManyByParam("id", ids, r.lnglat, r.cursor)
    res.json(response)
  }
  //УДАЛИТЬ ПОТОМ
  // @logError
  // async decorator(req: Request, res: Response) {
  //   const asd = await axios.get('/')
  //   logger.info(asd.data.asdsad)
  // }
}

export default new HttpLikesController