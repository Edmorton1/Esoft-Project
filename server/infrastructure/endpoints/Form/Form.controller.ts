import { requestToLike } from "@s/infrastructure/db/SQL/SQLform";
import FormValidation from "@s/infrastructure/endpoints/Form/validation/Form.validation";
import { FORM_SEARCH_LIMIT, pickFieldsForm } from "@shared/CONST";
import { Request, Response } from "express";

class FormController {
  searchForm = async (req: Request, res: Response) => {
    const search = FormValidation.searchForm(req)
    // const rawSearch = requestToForm(undefined, {name: })
    let query = requestToLike({name: "name", param: search}, Object.keys(pickFieldsForm).join(', '))
    query = query.limit(FORM_SEARCH_LIMIT)

    res.json(await query)
  }
}

export default FormController