import { inject, injectable } from "inversify";
import ServerExpress from "@s/server.express";
import ConfigService from "@s/config/services/config.service";

// ЭНДПОЙНТЫ РЕАЛИЗОВЫВАТЬ В КОНТРОЛЛЕРАХ

interface IServer {
	basePath: string;
	port: number;

	init: () => void;
	close: () => void;
}

@injectable()
class App implements IServer {
	basePath: string;
	port: number;

	constructor(
		@inject(ConfigService)
		private readonly configService: ConfigService,
		@inject(ServerExpress)
		private readonly framework: ServerExpress,
	) {
		this.basePath = this.configService.get("URL_SERVER");
    this.port = Number(this.configService.get("PORT")) || 3000
	}

	init = async () => {
		this.framework.init(this.basePath, this.port);
	};

	close = () => {
		this.framework.close();
	};
}

export default App;
