import { clientsType } from "@s/helpers/WebSocket/socket";
import { Request, Response } from "express";
import logger from "@s/helpers/logger";
import LikesValidation from "@s/infrastructure/endpoints/Likes/validation/Likes.validation";
import LikesModule from "@s/infrastructure/endpoints/Likes/sql/Likes.module";
import { toSOSe } from "@s/helpers/WebSocket/JSONParsers";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";
import SharedValidation from "@s/infrastructure/middlewares/Shared.validation";
import { inject, injectable } from "inversify";
import TYPES from "@s/routes/containers/types";

interface LikesRepository {
  sendLike(req: Request, res: Response): Promise<void>,
  sendDelete(req: Request, res: Response): Promise<void>,
  likesGet(req: Request, res: Response): Promise<void>,
}

@injectable()
class LikesController implements LikesRepository {
  constructor(
    @inject(ORMCopy)
    private readonly ORM: ORMCopy,
    @inject(TYPES.clients)
    private readonly clients: clientsType,
    @inject(LikesModule)
    private readonly likesModule: LikesModule
  ) {}

  sendLike = async (req: Request, res: Response) => {

    const likesDTO = LikesValidation.sendLike(req)

    const [data] = await this.ORM.post(likesDTO, 'likes', "id, liked_userid")
    logger.info(this.clients.keys())
    const clientTo = this.clients.get(likesDTO.liked_userid)
    clientTo?.send(toSOSe('like', data))
    
    res.json(data)
  }

  sendDelete = async (req: Request, res: Response) => {
    const [id] = SharedValidation.OnlyId(req)

    const [data] = await this.ORM.delete(id, 'likes', req.session.userid!)

    if (!data) {res.sendStatus(403); return;} 

    const clientTo = this.clients.get(data.liked_userid)
    clientTo?.send(toSOSe('delete_like', data.id))

    res.json(data)
  }

  likesGet = async (req: Request, res: Response) => {
    const [lnglat, cursor] = LikesValidation.likesGet(req)
    // logger.info({lnglat, cursor})

    // logger.info({riad: r.iid})
    const ids = (await this.ORM.getByParams({liked_userid: req.session.userid}, 'likes', 'userid')).map(e => e.userid)
    logger.info({ids})

    const response = await this.likesModule.getManyByParam("id", ids, lnglat, cursor)
    res.json(response)
  }
}

export default LikesController