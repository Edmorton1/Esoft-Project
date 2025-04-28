import { Form } from "@s/core/domain/Users";
import { one } from "@s/infrastructure/db/Mappers";
import { ORM } from "@s/infrastructure/db/ORM";
import { FormService } from "@s/infrastructure/services/FormService";
import { Request, Response } from "express";

// SELECT 
//   forms.*, 
//   COALESCE(json_agg(user_tags.tagid) FILTER (WHERE user_tags.tagid IS NOT NULL), '[]') AS tags
// FROM forms
// LEFT JOIN user_tags ON forms.id = user_tags.id
// WHERE forms.id = 33
// GROUP BY forms.id;
// ЗАПРОС НА ПОЛУЧЕНИЕ ФОРМЫ И ТЕГОВ


export class HttpFormController {
  constructor(
    readonly FormService: FormService,
    readonly ORM: ORM
  ) {}

  async postForm(req: Request, res: Response) {
    const data: Form = req.body
    console.log(data)
    const tags = data.tags
    delete data.tags
    const form = one(await this.ORM.post(data, 'forms'))
    tags?.forEach(async tag => {
      //@ts-ignore
      this.FormService.pushTag(data.id, tag)
    })
    res.json(form)
  }
}