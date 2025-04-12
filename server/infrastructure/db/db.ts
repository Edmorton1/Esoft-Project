import { Pool } from "pg"
const pool = new Pool({
    user: "postgres",
    password: "stalin",
    host: "localhost",
    port: 5432,
    database: "Znakomstva Site"
})

export default pool