import { DataSource } from "typeorm";
// import Employee from "./employee";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 8765,
    // username: process.env.POSTGRES_USERNAME,
    // password: process.env.POSTGRES_PASSWORD,
    username: 'postgres',
    password: 'password',
    database: "training",
    entities: ["dist/src/entity/*.js"],
    migrations:["dist/src/db/migrations/*.js"],
    logging: true,
    namingStrategy:new SnakeNamingStrategy(),
    synchronize:false
});

export default dataSource;