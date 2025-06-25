import { IHttpContext } from "@s/infrastructure/express/Http.interfaces";
import HttpServiceExpress from "@s/infrastructure/express/Http.service";

class HttpContext<T = any> implements IHttpContext<T> {
	public par_id?: number;

	constructor(private readonly service: HttpServiceExpress) {}

	get body() {
		return this.service.getBody();
	}

	get params() {
		return this.service.getParams();
	}

	get query() {
		return this.service.getQuery();
	}

	get session() {
		return this.service.getSession();
	}

	json: IHttpContext<T>["json"] = (data) => {
		this.service.json<T>(data);
	};

	sendStatus: IHttpContext["sendStatus"] = code => {
		this.service.sendStatus(code);
	};

	next = () => this.service.next();
}

export default HttpContext;
