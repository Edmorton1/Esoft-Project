import knex from "knex";

const testDB = knex({
  client: "pg",
  connection: {
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 5433,
    database: "Znakomstva PROD",
    // database: "Znakomstva TEST",
  },
});

export default testDB;