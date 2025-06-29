jest.mock('@s/infrastructure/redis/redis', () => ({
  redisClient: {
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
    quit: jest.fn(),
    disconnect: jest.fn(),
  },
  redisStore: jest.fn(),
}));