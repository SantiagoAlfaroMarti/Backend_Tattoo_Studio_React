import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Role1720102950232 } from "./migrations/1720105172417-Roles";
import { User1720103322889 } from "./migrations/1720105188747-Users";
import { Service1720103843371 } from "./migrations/1720105203929-Services";
import { Appointment1720103974702 } from "./migrations/1720105227415-Appointments";

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