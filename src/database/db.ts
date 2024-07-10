import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Role1720020765697 } from "./migrations/1720020765697-roles";
import { User1719865380892 } from "./migrations/1719865380892-users";
import { Service1719865365240 } from "./migrations/1719865365240-services";
import { Appointment1719865410532 } from "./migrations/1719865410532-appointments";

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