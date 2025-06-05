import knex from "knex";

const db = knex({
	client: "pg",
	connection: {
		user: "postgres",
		password: "stalin",
		host: "localhost",
		port: 5432,
		database: "Znakomstva Site",
		// database: "Znakomstva TEST",
	},
});

export default db;
