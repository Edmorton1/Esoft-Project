import { tables } from "@t/gen/types"
import ORM from "@s/infrastructure/db/SQL/ORM"
import { Request, Response } from "express"
import logger from "@s/helpers/logger";

class CRUDController {
  constructor(
    readonly table: tables
  ) {}
  
  get = async (req: Request<object, object, object, {fields?: string, lnglat: string}>, res: Response) => {
    const { fields, lnglat, ...params } = req.query;
    delete req.query.fields

    if (Object.keys(req.query).length > 0) {
      logger.info({REQ_QUERY: req.query})
      return res.json(await ORM.getByParams(params, this.table, fields))
    }
    res.json(await ORM.get(this.table, fields))
  }
  getById = async (req: Request<{id: string}, object, object, {fields?: string}>, res: Response) => {
    const {fields} = req.query
    const {id} = req.params
    const request = await ORM.getById(id, this.table, fields)

    if (!request.length) return res.sendStatus(404)

    res.json(request)
  }
  post = async (req: Request, res: Response) => {
    logger.info(req.body)
    const dto = req.body
    const request = await ORM.post(dto, this.table)
    res.json(request)
  }
  put = async (req: Request, res: Response) => {
    const {id} = req.params
    const dto = req.body
    const request = await ORM.put(dto, id, this.table)
    res.json(request)
  }
  delete = async (req: Request, res: Response) => {
    const {id} = req.params
    const data = await ORM.delete(id, this.table, req.session.userid!)

    if (!data[0]) return res.sendStatus(403)
    
    res.json(data)
  }
}

export default CRUDController