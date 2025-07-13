type FuncsMap<T extends string> = { [K in T]: () => void | Promise<void> };

class BroadCast<T extends string> {
	private channel: BroadcastChannel;
	private funcs: Map<string, () => void>;

	constructor(name: string) {
		this.channel = new BroadcastChannel(name);
		console.log("[CHANNEL]: КАНАЛ ИНИЦИАЛИЗИРОВАН");

		this.funcs = new Map();

		this.channel.onmessage = ev => {
			const key = ev.data;

			console.log(`[CHANNEL]: ПОЛУЧЕНО СООБЩЕНИЕ ${key}`);

			if (typeof key !== "string") throw new Error("ON MESSAGE В BROADCAST НЕ СТРОКА");
			const func = this.funcs.get(key);

			console.log(`[CHANNEL]: ПОЛУЧЕНА ФУНКЦИЯ: ${func}`);

			if (func) return func();
			throw new Error("Функция не нашлась в Map");
		};
	}

	// : [key: T, func: () => void]
	register = (funcs: FuncsMap<T>) => {
		for (const key in funcs) {
			const func = funcs[key]
			this.funcs.set(key, func)
		}
	};

	startFuncion = (key: T) => {
		// this.funcs.set(key, func);
		// console.log(`[CHANNEL]: УСТАНОВЛЕНА ФУНКЦИЯ ФУНКЦИЯ: key: ${key}; func: ${func}`)
		this.channel.postMessage(key);
	};

	close() {
		this.channel.close();
	}
}

export default BroadCast;
