import { toTS } from "@shared/MAPPERS"
import SQLHard from "@s/infrastructure/db/requests/SQLHard"
import { Request, Response } from "express"

class HttpHardController {
  constructor (
    readonly SQLHard: SQLHard
  ) {}

  async getUserTags(req: Request, res: Response) {
    const {id} = req.params
    console.log(id)
    const request = toTS(await this.SQLHard.getUserTags(id))
    res.json(request)
  }
}

export default HttpHardController