import { DataSource } from "typeorm";
// import Employee from "./employee";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "password",
    database: "training",
    entities: [Employee],
    migrations:["dist/src/db/migrations/*.js"],
    logging: true,
    namingStrategy:new SnakeNamingStrategy(),
    synchronize:true
});

export default dataSource;