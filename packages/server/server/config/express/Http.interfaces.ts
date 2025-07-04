import { UserRoleType } from "@t/gen/Users";
import { Session, SessionData } from "express-session";

export interface NodeFile {
	buffer: Buffer<ArrayBufferLike>
}

export interface IHttpContext<T = any> {
	body: any;
	params: any;
	query: any;
	session: Session & Partial<SessionData> & { userid?: number; role?: UserRoleType };
	file?: NodeFile
	files?: NodeFile[]

	json: (data: T) => void;
	sendStatus: (code: number) => void;
	next: () => void;
	statusJson: <R>(code: number, data: R) => void;
	clearCookie: (name: string) => void;
	set: (field: string, value: string) => void
	headers: (name: string) => string | string[] | undefined
}

export interface IHttpService {
	getBody: () => any;
	getParams: () => any;
	getQuery: () => any;
	getSession: () => any;
	getFile: () => NodeFile | undefined
	getFiles: () => NodeFile[] | undefined

	json: <T>(data: T) => void;
	sendStatus: (code: number) => void;
	next: () => void;
	statusJson: <R>(code: number, data: R) => void;
	clearCookie: (name: string) => void;
	set: (field: string, value: string) => void
	headers: (name: string) => string | string[] | undefined
}
