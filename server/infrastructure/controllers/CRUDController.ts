import { tables } from "@s/core/domain/types"
import { ORM } from "@s/infrastructure/db/ORM"
import { Request, Response } from "express"

export class CRUDController {
  constructor(
    readonly ORM: ORM,
    readonly table: tables
  ) {}
  
  async get(req: Request, res: Response) {
    const request = await this.ORM.get(this.table)
    res.json(request)
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
}