import { toTS } from "@shared/MAPPERS"
import SQLHard from "@s/infrastructure/endpoints/ExtendSearch/sql/SQLHard"
import { Request, Response } from "express"

class HttpExtendedSearchController {

  async getForms(req: Request, res: Response) {
    const {tags, ...params} = req.query
    
    //@ts-ignore
    const tagsArr = await SQLHard.getUserTags(tags.trim())
    //@ts-ignore
    const zapisi = await SQLHard.getByTags(tagsArr, params)
    
    console.log(tagsArr)

    res.json(zapisi)
  }
}

export default new HttpExtendedSearchController