import Redis from "ioredis"
import logger from "@s/logger"

export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379
})

redis.on('connect', () => logger.info('REDIS CONNECT...'))
