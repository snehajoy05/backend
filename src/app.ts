import "reflect-metadata";
import express from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import employeeRoute from "./route/employee.route";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees',employeeRoute);


(async ()=>{
    await dataSource.initialize();

    server.listen(3000, ()=>{
        console.log("Server is listening to 3000")
    })
})();




// import { Calculator } from "./calculator";
// const clc1=new Calculator();

// console.log(clc1.add(4,2));
// console.log(clc1.subtract(10,5));
// console.log(clc1.multiply(5,4));
// console.log(clc1.divide(20,5));
// console.log(clc1.percent(10,100));



