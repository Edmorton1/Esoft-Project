import { Form } from "@s/core/domain/Users";
import { one } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import FormService from "@s/infrastructure/endpoints/Form/services/FormService";
import { Request, Response } from "express";

// SELECT 
//   forms.*, 
//   COALESCE(json_agg(user_tags.tagid) FILTER (WHERE user_tags.tagid IS NOT NULL), '[]') AS tags
// FROM forms
// LEFT JOIN user_tags ON forms.id = user_tags.id
// WHERE forms.id = 33
// GROUP BY forms.id;
// ЗАПРОС НА ПОЛУЧЕНИЕ ФОРМЫ И ТЕГОВ


class HttpFormController {
  async postForm(req: Request, res: Response) {
    const data: Form = req.body
    console.log(data)
    const tags = data.tags
    delete data.tags
    const form = one(await ORM.post(data, 'forms'))
    tags?.forEach(async tag => {
      FormService.pushTag(data.id, tag)
    })
    res.json(form)
  }
}

export default new HttpFormController