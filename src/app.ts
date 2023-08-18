import * as dotenv from "dotenv";
dotenv.config({path:__dirname+'/.env'});
import cors from 'cors';

import "reflect-metadata";
import express from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import employeeRoute from "./route/employee.route";
import HttpException from "./exception/http.exception";
import errorMiddleware from "./middleware/error.middleware";
import departmentRoute from "./route/department.route";
import { Role } from "./utils/role.enum";

const server = express();
server.use(cors());
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees',employeeRoute);
server.use('/departments',departmentRoute);
//server.use('/roles',roleRoute)
server.get("/roles", (req,res)=>{
    res.status(200).send(Role)
  })

server.use(errorMiddleware);
(async ()=>{
    try {
        await dataSource.initialize();
        
        server.listen(3001, ()=>{
            console.log("Server is listening to 3001")
        })
        
    } catch (error) {
        console.log(error)
    }
})();




// import { Calculator } from "./calculator";
// const clc1=new Calculator();

// console.log(clc1.add(4,2));
// console.log(clc1.subtract(10,5));
// console.log(clc1.multiply(5,4));
// console.log(clc1.divide(20,5));
// console.log(clc1.percent(10,100));



