import { Tables, tables } from "@s/core/domain/types"
import { frJSON } from "@s/infrastructure/db/Mappers"
import { ORM } from "@s/infrastructure/db/ORM"
import { Request, Response } from "express"

export class CRUDController {
  constructor(
    readonly ORM: ORM,
    readonly table: tables
  ) {}
  
  async get(req: Request<{query: string}>, res: Response) {
    if (Object.keys(req.query).length > 0) {
      const params = req.query
      return res.json(await this.ORM.getByParams(params, this.table))
    }
    res.json(await this.ORM.get(this.table))
  }
  async getById(req: Request, res: Response) {
    const {id} = req.params
    const request = await this.ORM.getById(id, this.table)
    res.json(request)
  }
  async post(req: Request, res: Response) {
    console.log(req.body)
    const dto = req.body
    const request = await this.ORM.post(dto, this.table)
    res.json(request)
  }
  async put(req: Request, res: Response) {
    const {id} = req.params
    const dto = req.body
    const request = await this.ORM.put(dto, id, this.table)
    res.json(request)
  }
  async delete(req: Request, res: Response) {
    const {id} = req.params
    const request = await this.ORM.delete(id, this.table)
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