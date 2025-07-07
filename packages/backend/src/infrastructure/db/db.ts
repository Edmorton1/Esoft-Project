import knex from "knex";

const PG_HOST = process.env.PG_HOST || "localhost"
const PG_PORT = process.env.PG_PORT || 5433

const db = knex({
	client: "pg",
	connection: {
		user: "postgres",
		password: "123",
		host: PG_HOST,
		port: Number(PG_PORT),
		database: "Znakomstva",
		// database: "Znakomstva TEST",
	},
});

export default db;