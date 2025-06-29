import { ILogger } from "@s/helpers/logger/logger.controller";

class ConsoleService implements ILogger {
	info: ILogger["info"] = (data) => console.log(data);

  error: ILogger['error'] = (data) => console.error(data)
}

export default ConsoleService;
