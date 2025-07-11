import { IHttpService, NodeFile } from "@app/server/config/express/Http.interfaces";
import { Request, Response, NextFunction } from "express";

class HttpServiceExpress implements IHttpService {
	constructor(
		readonly req: Request,
		readonly res: Response,
		readonly nextFu: NextFunction,
	) {}

	getBody = () => this.req.body;

	getParams = () => this.req.params;

	getQuery = () => this.req.query;

	getSession = () => this.req.session;

	getFile = () => this.req.file;

	getFiles = () => this.req.files as NodeFile[] | undefined;

	json: IHttpService["json"] = data => this.res.json(data);

	sendStatus = (code: number) => this.res.sendStatus(code);

	next = () => this.nextFu();

	statusJson: IHttpService["statusJson"] = (code, data) => {
		this.res.status(code).json(data);
	};

	clearCookie: IHttpService["clearCookie"] = name => this.res.clearCookie(name);

	set: IHttpService["set"] = (field, value) => {
		this.res.set("Access-Control-Expose-Headers", field);
		this.res.set(field, value);
	};

	headers: IHttpService["headers"] = name => {
		return this.req.headers[name];
	};

	send: IHttpService["send"] = (status, message) => {
		return this.res.send(message).status(status);
	};

	redirect: IHttpService["redirect"] = url => {
		return this.res.redirect(url);
	};

	getUrl: IHttpService['getUrl'] = () => {
		return this.req.url
	}

	end: IHttpService['end'] = message => {
		return this.res.end(message)
	}
}

export default HttpServiceExpress;
