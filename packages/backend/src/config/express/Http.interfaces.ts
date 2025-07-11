import { UserRoleType } from "@app/types/gen/Users";
import { Session, SessionData } from "express-session";

//@ts-expect-error
// ПОТОМ УБРАТЬ
export interface NodeFile {
	buffer: Buffer<ArrayBufferLike>;
}

export interface SessionDataResolved {
	userid?: number;
	role?: UserRoleType;
	state?: string;
}

export interface IHttpContext<T = any> {
	body: any;
	params: any;
	query: any;
	session: Session & Partial<SessionData> & SessionDataResolved;
	url: string;
	file?: NodeFile;
	files?: NodeFile[];

	json: (data: T) => void;
	sendStatus: (code: number) => void;
	next: () => void;
	statusJson: <R>(code: number, data: R) => void;
	clearCookie: (name: string) => void;
	set: (field: string, value: string) => void;
	headers: (name: string) => string | string[] | undefined;
	send: (status: number, message: string) => void;
	redirect: (url: string) => void;
	end: (message: string) => void
}

export interface IHttpService {
	getBody: () => any;
	getParams: () => any;
	getQuery: () => any;
	getSession: () => any;
	getFile: () => NodeFile | undefined;
	getFiles: () => NodeFile[] | undefined;
	getUrl: () => string;

	json: <T>(data: T) => void;
	sendStatus: (code: number) => void;
	next: () => void;
	statusJson: <R>(code: number, data: R) => void;
	clearCookie: (name: string) => void;
	set: (field: string, value: string) => void;
	headers: (name: string) => string | string[] | undefined;
	send: (status: number, message: string) => void;
	redirect: (url: string) => void;
	end: (message: string) => void
}
