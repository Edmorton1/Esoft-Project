import { UserRoleType } from "@t/gen/Users";

export interface IHttpContext {
	body: any;
	params: any;
	query: any;
	session: { userid?: number; role?: UserRoleType };

	json: (data: any) => void;
	sendStatus: (code: number) => void;
}

export interface IHttpService {
	getBody: () => any;
	getParams: () => any;
	getQuery: () => any;
	getSession: () => any;

	json: (data: any) => void;
	sendStatus: (code: number) => void;
}
