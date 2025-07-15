import { IEnv } from "@app/client/types/declarations/env";

export interface buildPaths {
	entry: string;
	output: string;
	html: string;
	src: string;
	server: string;
	shared: string;
	public: string;
	favicon: string;
	types: string;
	// tsconfig: string
	// test: string
}

export interface buildUrls {
	server: string;
	prefix: string;
}

export interface buildSocket {
	server: string;
	prefix: string;
}

export type buildMode = "production" | "development";

export interface BuildOptions {
	port: number;
	paths: buildPaths;
	mode: buildMode;
	url: buildUrls;
	socket: buildSocket;
	analyzer?: boolean;

	dotenv: IEnv;
}
