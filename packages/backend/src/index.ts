import path from "path";

console.log(path.resolve(process.cwd(), ".env"))

import dotenv from "dotenv"
dotenv.config({path: path.resolve(process.cwd(), ".env")})

import appBindingsContainer from "@app/server/config/containers/container.di";
import App from "@app/server/server/server";
import "@app/server/types/declarations/index"
import "reflect-metadata"

async function bootstrap():Promise<void> {
	const app = appBindingsContainer.get<App>(App);

	await app.init();
}

export const boot = bootstrap();
