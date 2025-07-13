import rateLimit from "express-rate-limit";
import type { Options } from "express-rate-limit";

function createBaseLimiter(options: Partial<Options>) {
	return rateLimit({
		message: "Слишком много запросов. Повторите позже",
		...options,
		standardHeaders: true,
		legacyHeaders: false,
	});
}

const minute = 60 * 1000

export const authPost = createBaseLimiter({
	message: "AUTH POST",
	windowMs: minute,
	limit: 50,
});

export const authGet = createBaseLimiter({
	message: "AUTH GET",
	windowMs: minute,
	limit: 100,
});

export const noAuthGet = createBaseLimiter({
	message: "NO AUTH GET",
	windowMs: minute,
	limit: 20,
});

export const noAuthPost = createBaseLimiter({
	message: "NO AUTH POST",
	windowMs: minute,
	limit: 3,
});