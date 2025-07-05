import BaseController from "@app/server/config/base/Base.controller";
import { requestToFormParams, requestToLike, standartToForm } from "@app/server/infrastructure/db/SQL/SQLform";
import FormValidation from "@app/server/infrastructure/endpoints/Form/validation/Form.validation";
import HttpContext from "@app/server/config/express/Http.context";
import { FORM_SEARCH_LIMIT, pickFieldsForm } from "@app/shared/CONST";
import { serverPaths } from "@app/shared/PATHS";

class FormController extends BaseController {
  constructor () {
    super()

    this.bindRoutes([
      {
        path: `${serverPaths.searchForm}/:search`,
        method: "get",
        handle: this.searchForm,
      },
      {
        path: `${serverPaths.profileGet}/:id`,
        method: "get",
        handle: this.profileGet
      }
    ])
  }
  searchForm = async (ctx: HttpContext) => {
    const [search, lnglat] = FormValidation.searchForm(ctx)
    // const rawSearch = requestToForm(undefined, {name: })
    let query = requestToLike({name: "name", param: search}, Object.keys(pickFieldsForm).filter(e => e !== "distance").join(', '), lnglat)
    query = query.limit(FORM_SEARCH_LIMIT)

    ctx.json(await query)
  }

  profileGet = async (ctx: HttpContext) => {
    const [id, lnglat] = FormValidation.profileGet(ctx)
    const query = requestToFormParams({id}, undefined, lnglat)
    ctx.json(await query)
  }
}

export default FormController