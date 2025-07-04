jest.mock('@app/server/infrastructure/redis/redis', () => ({
  redisClient: {
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
    quit: jest.fn(),
    disconnect: jest.fn(),
  },
  redisStore: jest.fn(),
}));

jest.mock('@app/server/helpers/logger/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));