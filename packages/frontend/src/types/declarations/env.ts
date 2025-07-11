export interface IEnv {
	GISKEY: string;
  GOOGLE_CLIENT_ID: string
}

declare global {
	const _GISKEY: string;
	const _GOOGLE_CLIENT_ID: string;
}

export {};
