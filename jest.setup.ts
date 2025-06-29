jest.mock('@s/infrastructure/redis/redis', () => ({
  redisClient: {
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
    quit: jest.fn(),
    disconnect: jest.fn(),
  },
  redisStore: jest.fn(),
}));

jest.mock('@s/helpers/logger/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));