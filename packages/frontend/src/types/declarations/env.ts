export interface IEnv {
	GISKEY: string;
	URL_CLIENT: string;
	URL_SERVER: string;
	URL_SERVER_WS: string;
}

declare global {
	const _GISKEY: string;
	const _URL_CLIENT: string;
	const _URL_SERVER: string;
	const _URL_SERVER_WS: string;
}

export {};
