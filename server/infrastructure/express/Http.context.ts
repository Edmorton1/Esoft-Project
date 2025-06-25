import { IHttpContext } from "@s/infrastructure/express/Http.interfaces";
import HttpServiceExpress from "@s/infrastructure/express/Http.service";

class HttpContext implements IHttpContext {
	constructor(
    private readonly service: HttpServiceExpress
  ) {}

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
    return this.service.getSession()
  }

	json: IHttpContext["json"] = data => {
		this.service.json(data);
	};

	sendStatus: IHttpContext["sendStatus"] = code => {
		this.service.sendStatus(code);
	};
}

export default HttpContext;
