import { tables } from "@s/core/domain/types"
import { CRUDRepository } from "@s/core/repositories/CRUDRepository"
import { Request, Response } from "express"

export class CRUDController {
  constructor(
    readonly CRUD: CRUDRepository,
    readonly table: tables
  ) {}
  
  async get(req: Request, res: Response) {
    const response = await this.CRUD.get(this.table)
    res.json(response)
  }
  async post(req: Request, res: Response) {
    console.log(req.body)
    const dto = req.body
    const response = await this.CRUD.post(dto, this.table)
    res.json(response)
  }
  async put(req: Request, res: Response) {
    const {id} = req.params
    const dto = req.body
    const request = await this.CRUD.put(dto, id, this.table)
    res.json(request)
  }
  async delete(req: Request, res: Response) {
    const {id} = req.params
    const request = await this.CRUD.delete(id, this.table)
    res.json(request)
  }
}