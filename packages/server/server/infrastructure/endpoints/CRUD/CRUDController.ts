import { tables } from "@t/gen/types";
// import ORM from "@s/infrastructure/db/SQL/ORM"
import logger from "@s/helpers/logger/logger";
import { inject, injectable } from "inversify";
import ORM from "@s/infrastructure/db/SQL/ORM";
import BaseController from "@s/config/base/Base.controller";
import HttpContext from "@s/config/express/Http.context";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import { z } from "zod";

const publicEndpoints = [
  "/forms",
  "/forms/:id",
  "/likes"
]

@injectable()
class CRUDController extends BaseController {
	constructor(
		@inject("tables")
		private readonly table: tables,
		@inject("ORM")
		private readonly ORM: ORM,
	) {
		super();
		this.bindRoutes([
			{
				path: `/${table}`,
				method: "get",
				middlewares: (table !== "forms" && table !== "likes") ? [AuthMiddleware.OnlyAdmin] : [],
				handle: this.get,
			},
			{
				path: `/${table}/:id`,
				method: "get",
				middlewares: table !== "forms" ? [AuthMiddleware.OnlyAdmin] : [],
				handle: this.getById,
			},
			{
				path: `/${table}`,
				method: "post",
				middlewares: [AuthMiddleware.OnlyAdmin],
				handle: this.post,
			},
			{
				path: `/${table}/:id`,
				method: "put",
				middlewares: [AuthMiddleware.OnlyAdmin],
				handle: this.put,
			},
			{
				path: `/${table}/:id`,
				method: "delete",
				middlewares: [AuthMiddleware.OnlyAdmin],
				handle: this.delete,
			},
		]);
	}

	get = async (ctx: HttpContext) => {
		const { fields_raw, ...params } = ctx.query;
		delete ctx.query.fields;
    const fields = z.coerce.string().optional().parse(fields_raw)

		if (Object.keys(ctx.query).length > 0) {
			logger.info({ REQ_QUERY: ctx.query });
			return ctx.json(await this.ORM.getByParams(params, this.table, fields));
		}
		ctx.json(await this.ORM.get(this.table, fields));
	};

	getById = async (ctx: HttpContext) => {
		const fields = ctx.query.fields as string | undefined;
		const { id } = ctx.params;
		const request = await this.ORM.getById(id, this.table, fields);

		if (!request.length) return ctx.sendStatus(404);

		ctx.json(request);
	};

	post = async (ctx: HttpContext) => {
		logger.info(ctx.body);
		const dto = ctx.body;
		const request = await this.ORM.post(dto, this.table);
		ctx.json(request);
	};

	put = async (ctx: HttpContext) => {
		const { id } = ctx.params;
		const dto = ctx.body;
		const userid = ctx.session.userid!
		const request = await this.ORM.put(dto, id, this.table, userid);
		ctx.json(request);
	};
  
	delete = async (ctx: HttpContext) => {
		const { id } = ctx.params;
		const data = await this.ORM.delete(id, this.table, ctx.session.userid!);

		if (!data[0]) return ctx.sendStatus(403);

		ctx.json(data);
	};
}

export default CRUDController;
