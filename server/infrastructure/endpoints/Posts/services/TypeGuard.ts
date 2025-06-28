export function ExpressMulterGuard(val: (string | Express.Multer.File)[]): val is Express.Multer.File[] {
  if (val.some(e => typeof e === "string")) throw new Error("СТРОКИ НЕЛЬЗЯ ПЕРЕДАВАТЬ")
}