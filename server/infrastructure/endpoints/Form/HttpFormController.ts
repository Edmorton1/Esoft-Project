import { requestToLike } from "@s/infrastructure/db/SQL/SQLform";
import { ReqForm } from "@s/infrastructure/endpoints/Form/middlewares/FormMiddlewares";
import { FORM_SEARCH_LIMIT, pickFieldsForm } from "@shared/CONST";
import { Request, Response } from "express";

class HttpFormController {
  searchForm = async (req: Request, res: Response) => {
    const r = req as ReqForm

    // const rawSearch = requestToForm(undefined, {name: })
    let query = requestToLike({name: "name", param: r.search}, Object.keys(pickFieldsForm).join(', '))
    query = query.limit(FORM_SEARCH_LIMIT)

    res.json(await query)
  }
}

export default new HttpFormController