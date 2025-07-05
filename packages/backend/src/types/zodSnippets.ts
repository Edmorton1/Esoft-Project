import z from "zod";

export const ExpressMulterFileSchema = z.custom<Express.Multer.File>(val => {
	return (
		val &&
		typeof val === "object" &&
		typeof val.originalname === "string" &&
		typeof val.encoding === "string"
	);
});
