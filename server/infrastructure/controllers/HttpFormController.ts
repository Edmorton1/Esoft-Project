import { Form } from "@s/core/domain/Users";
import { ORM } from "@s/infrastructure/db/ORM";
import { FormService } from "@s/infrastructure/services/FormService";
import { Request, Response } from "express";

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
    const form = await this.ORM.post(data, 'forms')
    tags.forEach(async tag => {
      this.FormService.pushTag(data.id, tag)
    })
    res.json(form)
  }
}