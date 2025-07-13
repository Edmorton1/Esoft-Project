type FuncType = (...args: any[]) => void | Promise<void>;

type FuncsMap<T extends string> = { [K in T]: FuncType };

class BroadCast<T extends string> {
	private channel: BroadcastChannel;
	private funcs: Map<string, FuncType>;

	constructor(name: string) {
		this.channel = new BroadcastChannel(name);
		console.log("[CHANNEL]: КАНАЛ ИНИЦИАЛИЗИРОВАН");

		this.funcs = new Map();

		this.channel.onmessage = ev => {
			const { key, jsonArgs } = ev.data as {key: string, jsonArgs: string};

			const args = JSON.parse(jsonArgs)

			console.log(`[CHANNEL]: ПОЛУЧЕНО СООБЩЕНИЕ ${key} ${args}`);

			if (!Array.isArray(args)) throw new Error("ARGS НЕ МАССИВ");
			if (typeof key !== "string") throw new Error("ON MESSAGE В BROADCAST НЕ СТРОКА");

			const func = this.funcs.get(key);

			console.log(`[CHANNEL]: ПОЛУЧЕНА ФУНКЦИЯ: ${func}`);

			if (func) return func(...args);

			throw new Error("Функция не нашлась в Map");
		};
	}

	register = (funcs: FuncsMap<T>) => {
		for (const key in funcs) {
			const func = funcs[key];
			console.log("[CHANNEL] ЗАРЕГИСТРИРОВАНА ФУНКЦИЯ", func);
			this.funcs.set(key, func);
		}
	};

	startFunction = (key: T, args: any[] = []) => {
		const jsonArgs = JSON.stringify(args);

		this.channel.postMessage({ key, jsonArgs });
	};

	close() {
		this.channel.close();
	}
}

export default BroadCast;
