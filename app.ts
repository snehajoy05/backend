import express from "express";
import {employeeRouter} from "./employee_router";
import Employee from "./employee";
import loggerMiddleware from "./loggerMiddleware";

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use('/employees',employeeRouter);

server.listen(3000, ()=>{
    console.log("Server is listening to 3000")
})




// import { Calculator } from "./calculator";
// const clc1=new Calculator();

// console.log(clc1.add(4,2));
// console.log(clc1.subtract(10,5));
// console.log(clc1.multiply(5,4));
// console.log(clc1.divide(20,5));
// console.log(clc1.percent(10,100));



