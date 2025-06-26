import appBindingsContainer from "@s/config/containers/container.di";
import App from "@s/server/server";
import "@t/declarations/server/index";

async function bootstrap():Promise<void> {
	const app = appBindingsContainer.get<App>(App);

	await app.init();
}

export const boot = bootstrap();