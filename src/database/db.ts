import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";
import { Service1719865365240 } from "./migrations/1719865365240-service";
import { User1719865380892 } from "./migrations/1719865380892-user";
import { Role1719865395083 } from "./migrations/1719865395083-role";
import { Appointment1719865410532 } from "./migrations/1719865410532-appointment";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    synchronize: false,
    logging: false,
})