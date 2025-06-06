export function assertKnex(value: unknown): asserts value is {sql: string} {
  if (typeof value !== 'object' || value === null || typeof (value as any).sql !== "string") throw new Error("Это не Knex Raw")
}