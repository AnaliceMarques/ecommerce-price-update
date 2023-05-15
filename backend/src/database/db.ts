import { knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DB_MYSQL,
  },
});
