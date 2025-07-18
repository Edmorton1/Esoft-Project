//@ts-ignore
// ПОТОМ ПОФИКСИТЬ ЗДЕСЬ ИМПОРТЫ, СЕЙЧАС ОНИ НЕ РАБОТАЮТ ИЗ-ЗА ПАПКИ HELPERS
jest.mock("@app/server/infrastructure/helpers/databases/redis/redis", () => ({
	redisClient: {
		connect: jest.fn().mockResolvedValue(undefined),
		on: jest.fn(),
		quit: jest.fn(),
		disconnect: jest.fn(),
	},
	redisStore: jest.fn(),
}));

jest.mock("@app/server/infrastructure/helpers/logger/logger", () => ({
	info: jest.fn(),
	error: jest.fn(),
}));

