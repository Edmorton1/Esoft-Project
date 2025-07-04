import appBindingsContainer from "@app/server/config/containers/container.di";
import App from "@app/server/server/server";
import "@app/server/types/declarations/index"

async function bootstrap():Promise<void> {
	const app = appBindingsContainer.get<App>(App);

	await app.init();
}

export const boot = bootstrap();