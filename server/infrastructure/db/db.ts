import knex from "knex";
import {Pool} from "pg";
// const pool = new Pool({
//     user: "postgres",
//     password: "stalin",
//     host: "localhost",
//     port: 5432,
//     database: "Znakomstva Site"
// })

const pool = new Pool({
	user: "postgres",
	password: "stalin",
	host: "localhost",
	port: 5432,
	database: "Znakomstva Site",
});

export const db = knex({
	client: "pg",
	connection: {
		user: "postgres",
		password: "stalin",
		host: "localhost",
		port: 5432,
		database: "Znakomstva Site",
	},
});

export default pool;
