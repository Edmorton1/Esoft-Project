import { Form } from "@s/core/domain/Users";
import { ORM } from "@s/infrastructure/db/ORM";
import { FormService } from "@s/infrastructure/services/FormService";
import { Request } from "express";

export class HttpFormController {
  constructor(
    readonly FormService: FormService,
    readonly ORM: ORM
  ) {}

  postForm(req: Request, res: Response) {
    const data: Form = req.body
    // this.ORM.post(data, 'forms')
    // const { tags } = data
    // console.log(tags)
    data.tags.forEach(async tag => {
      // await this.ORM.post({tag}, 'tags')
      // const tagDBID = await this.FormService.findTagInDB(tag)
      this.FormService.pushTag(data.id, tag)

      // await this.ORM.post({id: data.id, tagId: tagInDB.id}, 'user_tags')
      // console.log()
    })
  }
}