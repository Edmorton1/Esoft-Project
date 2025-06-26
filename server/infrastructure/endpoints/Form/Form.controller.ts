import BaseController from "@s/config/base/Base.controller";
import { requestToLike } from "@s/infrastructure/db/SQL/SQLform";
import FormValidation from "@s/infrastructure/endpoints/Form/validation/Form.validation";
import HttpContext from "@s/infrastructure/express/Http.context";
import { FORM_SEARCH_LIMIT, pickFieldsForm } from "@shared/CONST";
import { serverPaths } from "@shared/PATHS";

class FormController extends BaseController {
  constructor () {
    super()

    this.bindRoutes([
      {
        path: `${serverPaths.searchForm}/:search`,
        method: "get",
        handle: this.searchForm,
      },
    ])
  }
  searchForm = async (ctx: HttpContext) => {
    const search = FormValidation.searchForm(ctx)
    // const rawSearch = requestToForm(undefined, {name: })
    let query = requestToLike({name: "name", param: search}, Object.keys(pickFieldsForm).join(', '))
    query = query.limit(FORM_SEARCH_LIMIT)

    ctx.json(await query)
  }
}

export default FormController