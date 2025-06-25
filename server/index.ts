import appBindingsContainer from "@s/routes/containers/container.di";
import App from "@s/server";

async function bootstrap():Promise<void> {
	const app = appBindingsContainer.get<App>(App);

	await app.init();
}



export const boot = bootstrap();