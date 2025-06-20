import logger from "@s/helpers/logger"
import {RedisStore} from "connect-redis"
import { createClient } from "redis"

export const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379
  }
})

// redisClient.on('connect', () => logger.info('REDIS CONNECT...'))
redisClient.connect()
  .then(() => console.log("REDIS CONNECT..."))
  .catch(console.error)

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session-"
})