import BaseController from "@app/server/config/base/Base.controller";
import FormValidation from "@app/server/infrastructure/requests/Form/validation/Form.validation";
import HttpContext from "@app/server/config/express/Http.context";
import { FORM_SEARCH_LIMIT, pickFieldsForm } from "@app/shared/CONST";
import { serverPaths } from "@app/shared/PATHS";
import { inject, injectable } from "inversify";
import SQLForm from "@app/server/infrastructure/helpers/databases/postgres/SQLform";

@injectable()
class FormController extends BaseController {
  constructor (
    @inject(SQLForm)
    private readonly sqlForm: SQLForm
  ) {
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
    let query = this.sqlForm.requestToLike({name: "name", param: search}, Object.keys(pickFieldsForm).filter(e => e !== "distance").join(', '), lnglat)
    query = query.limit(FORM_SEARCH_LIMIT)

    ctx.json(await query)
  }

  profileGet = async (ctx: HttpContext) => {
    const [id, lnglat] = FormValidation.profileGet(ctx)
    const query = this.sqlForm.requestToFormParams({id}, undefined, lnglat)
    ctx.json(await query)
  }
}

export default FormController