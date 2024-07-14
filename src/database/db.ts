import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Roles1720681724336 } from "./migrations/1720681724336-roles";
import { Users1720681739039 } from "./migrations/1720681739039-users";
import { Services1720681754116 } from "./migrations/1720681754116-services";
import { Appointments1720681772677 } from "./migrations/1720681772677-appointments";

export const AppDataSource = new DataSource({
type: "mysql",
host: process.env.DB_HOST,
port: Number(process.env.DB_PORT),
username: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE,
entities: [`${__dirname}/models/**/*{.ts,.js}`],
migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
synchronize: false,
logging: false,
})