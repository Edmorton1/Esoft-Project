import { toTS } from "@shared/MAPPERS"
import SQLHard from "@s/infrastructure/endpoints/ExtendSearch/sql/SQLHard"
import { Request, Response } from "express"

class HttpExtendedSearchController {

  getForms = async (req: Request<object, object, object, {tags: string, params: string, min_age: string, max_age: string, page: string}>, res: Response) => {
    const {tags, page, min_age, max_age, ...params} = req.query
    console.log(min_age, max_age, params)
    

    const tagsArr = tags ? await SQLHard.getUserTags(tags?.trim()) : []

    const zapisi = await SQLHard.getByTags(tagsArr, params, page, min_age, max_age)
    
    console.log(tagsArr)
    console.log(zapisi.length)
    res.json(zapisi)
  }
}

export default new HttpExtendedSearchController