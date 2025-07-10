import logger from "@app/server/infrastructure/helpers/logger/logger";
import { toSOCl } from "@app/shared/JSONParsers";
import { WebSocketWidh } from "@app/server/infrastructure/helpers/WebSocket/socket";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import { TIMEZONE } from "@app/shared/CONST";
import { inject, injectable } from "inversify";

const activeTimers = new Map();

@injectable()
class LastActiveFuncs {
  constructor (
    @inject(ORM)
    private readonly ORM: ORM
  ) {}

	TimePoint = async (wsClient: WebSocketWidh, id: number) => {
		if (activeTimers.has(id)) return;

		const doIter = () => {
			const last_active = new Date(Date.now() + TIMEZONE * 1000 * 60 * 60).toISOString();
			logger.info({ LAST_POINT: last_active });
			this.ORM.put({ last_active }, id, "forms", id);
			wsClient.send(toSOCl("last_active", last_active));
			logger.info({ ОТПРАВКА_ЗАПРОСА_СО_СМЕНОЙ_ДАТЫ: last_active });
		};

		// const last_active =  new Date(Date.now() + TIMEZONE * 1000 * 60 * 60).toISOString()
		// logger.info({LAST_POINT: last_active})

		// ORM.put({last_active}, id, "forms")

		doIter();
		const interval = setInterval(() => doIter(), 50000);

		logger.info({ SET_INTERVAL_ПОСТАВИЛ: 123 });

		activeTimers.set(id, interval);
	};

	StopTimePoint = (id: number) => {
		const interval = activeTimers.get(id);
		if (interval) {
			clearInterval(interval);
			activeTimers.delete(id);
		}
	};
}

export default LastActiveFuncs