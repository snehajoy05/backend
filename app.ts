// import express from "express";
// const server = express();
// server.get('/', (req, res)=>{
//     console.log(req.url);
//     res.status(200).send("hello world typescript");
// })
// server.listen(3000, ()=>{
//     console.log("Server is listening to 4000")
// })

import { Calculator } from "./calculator";
const clc1=new Calculator();

console.log(clc1.add(4,2));
console.log(clc1.subtract(10,5));
console.log(clc1.multiply(5,4));
console.log(clc1.divide(20,5));
console.log(clc1.percent(10,100));



