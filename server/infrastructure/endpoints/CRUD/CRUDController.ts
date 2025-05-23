import { tables } from "@t/gen/types"
import ORM from "@s/infrastructure/db/requests/ORM"
import { Request, Response } from "express"

class CRUDController {
  constructor(
    readonly table: tables
  ) {}
  
  get = async (req: Request<object, object, object, {fields?: string, sqlparams?: string}>, res: Response) => {
    const { fields, sqlparams, ...params } = req.query;
    delete req.query.fields
    delete req.query.sqlparams

    if (Object.keys(req.query).length > 0) {
      return res.json(await ORM.getByParams(params, this.table, fields, sqlparams))
    }
    res.json(await ORM.get(this.table, fields, sqlparams))
  }
  getById = async (req: Request<{id: string}, object, object, {fields?: string, sqlparams?: string}>, res: Response) => {
    const {fields, sqlparams} = req.query
    const {id} = req.params
    const request = await ORM.getById(id, this.table, fields, sqlparams)
    res.json(request)
  }
  post = async (req: Request, res: Response) => {
    console.log(req.body)
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
    const request = await ORM.delete(id, this.table)
    res.json(request)
  }

  // async getByParams(req: Request, res: Response) {
  //   const {table, ...params} = frJSON<{table: tables, params: Partial<Tables[tables]>}>(req.query.params)!
  //   // console.log(params)
  //   //@ts-ignore
  //   const request = await this.ORM.getByParams(params, table)
  //   res.json(request)
  // }
}

export default CRUDController