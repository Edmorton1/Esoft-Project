import knex from "knex";

const db = knex({
	client: "pg",
	connection: {
		user: "postgres",
		password: "123",
		host: "localhost",
		port: 5433,
		database: "Znakomstva",
		// database: "Znakomstva TEST",
	},
});

export default db;