import { IHttpContext } from "@app/server/config/express/Http.interfaces";
import HttpServiceExpress from "@app/server/config/express/Http.service";

class HttpContext<T = any> implements IHttpContext<T> {
	constructor(readonly service: HttpServiceExpress) {}

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

	get url() {
		return this.service.getUrl();
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

	headers: IHttpContext["headers"] = name => {
		return this.service.headers(name);
	};

	send: IHttpContext["send"] = (status, message) => {
		return this.service.send(status, message);
	};

	redirect: IHttpContext["redirect"] = url => {
		return this.service.redirect(url);
	};

	end: IHttpContext["end"] = message => {
		return this.service.end(message);
	};
}

export default HttpContext;
