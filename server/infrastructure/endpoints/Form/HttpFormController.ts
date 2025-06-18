import { pickFieldsForm } from "@/shared/ui/components/Header/Store-searchForm";
import { requestToLike } from "@s/infrastructure/db/requests/SQLform";
import { ReqForm } from "@s/infrastructure/endpoints/Form/middlewares/FormMiddlewares";
import { Request, Response } from "express";

class HttpFormController {
  searchForm = async (req: Request, res: Response) => {
    const r = req as ReqForm

    // const rawSearch = requestToForm(undefined, {name: })
    let query = requestToLike({name: "name", param: r.search}, Object.keys(pickFieldsForm).join(', '))
    query = query.limit(4)

    res.json(await query)
  }
}

export default new HttpFormController