jest.mock("easy-yandex-s3", () => {
	return jest.fn().mockImplementation(() => ({
		GetList: jest.fn().mockResolvedValue({
			Contents: [{ Key: "mock/key1" }, { Key: "mock/key2" }],
		}),
		Upload: jest.fn().mockResolvedValue({
			Key: "mock/uploaded.key",
			Location: "https://mock.location/mocked.key",
		}),
		Remove: jest.fn().mockResolvedValue(true),
	}));
});

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