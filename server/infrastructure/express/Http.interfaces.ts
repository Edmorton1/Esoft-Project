import { UserRoleType } from "@t/gen/Users";
import { Session, SessionData } from "express-session";

export interface IHttpContext<T = any> {
	body: any;
	params: any;
	query: any;
	session: Session & Partial<SessionData> & { userid?: number; role?: UserRoleType };

	json: (data: T) => void;
	sendStatus: (code: number) => void;
	next: () => void;
}

export interface IHttpService {
	getBody: () => any;
	getParams: () => any;
	getQuery: () => any;
	getSession: () => any;

	json: <T>(data: T) => void;
	sendStatus: (code: number) => void;
	next: () => void;
}
