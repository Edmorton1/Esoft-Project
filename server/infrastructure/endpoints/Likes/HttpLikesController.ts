import { Likes } from "@t/gen/Users";
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

    const likesDTO = r.likesDTO

    const [data] = await ORM.post(likesDTO, 'likes', "id, liked_userid")
    logger.info(clients.keys())
    const clientTo = clients.get(r.likesDTO.liked_userid)
    clientTo?.send(toSOSe('like', data))
    
    res.json(data)
  }

  sendDelete = async (req: Request, res: Response) => {
    const r = req as RequestOnlyId

    logger.info(r.iid)

    const [data] = await ORM.delete(r.iid, 'likes', req.session.userid!)

    if (!data) return res.sendStatus(403)

    const clientTo = clients.get(data.liked_userid)
    clientTo?.send(toSOSe('delete_like', data.id))

    res.json(data)
  }

  likesGet = async (req: Request, res: Response) => {
    const r = req as RequestGet

    // logger.info({riad: r.iid})
    const ids = (await ORM.getByParams({liked_userid: req.session.userid}, 'likes', 'userid')).map(e => e.userid)
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