import { toTS } from "@shared/MAPPERS"
import SQLHard from "@s/infrastructure/endpoints/ExtendSearch/sql/SQLHard"
import { Request, Response } from "express"

class HttpExtendedSearchController {

  async getForms(req: Request<{}, {}, {}, {tags: string, params: string}>, res: Response) {
    const {tags, ...params} = req.query
    console.log(tags, params)
    

    const tagsArr = tags ? await SQLHard.getUserTags(tags?.trim()) : []

    const zapisi = await SQLHard.getByTags(tagsArr, params)
    
    console.log(tagsArr)
    console.log(zapisi.length)
    res.json(zapisi)
  }
}

export default new HttpExtendedSearchController