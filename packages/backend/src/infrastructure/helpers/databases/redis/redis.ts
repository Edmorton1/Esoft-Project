import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST || "127.0.0.1";

export const redisClient = createClient({
	socket: {
		host: redisHost,
		port: 6379,
		connectTimeout: 15000,
	},
});

// redisClient.on('connect', () => logger.info('REDIS CONNECT...'))
export const connectRedis = () => {
	redisClient.connect()
		.then(() => console.log("REDIS CONNECT..."))
		.catch(console.error);
};

export const redisStore = new RedisStore({
	client: redisClient,
	prefix: "session-",
});
