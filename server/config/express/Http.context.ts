import { IHttpContext } from "@s/config/express/Http.interfaces";
import HttpServiceExpress from "@s/config/express/Http.service";

class HttpContext<T = any> implements IHttpContext<T> {
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

	get file() {
		return this.service.getFile();
	}

	get files() {
		return this.service.getFiles();
	}

	json: IHttpContext<T>["json"] = data => {
		this.service.json<T>(data);
	};

	sendStatus: IHttpContext["sendStatus"] = code => {
		this.service.sendStatus(code);
	};

	next = () => this.service.next();

	statusJson: IHttpContext["statusJson"] = (code, data) => {
		this.service.statusJson(code, data);
	};

	clearCookie: IHttpContext["clearCookie"] = name => {
		this.service.clearCookie(name);
	};

	set: IHttpContext["set"] = (field, value) => {
		this.service.set(field, value);
	};

	headers: IHttpContext['headers'] = (name) => {
		return this.service.headers(name);
	};
}

export default HttpContext;
