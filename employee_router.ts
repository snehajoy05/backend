import express from "express";
import Employee from "./employee";

const employeeRouter = express.Router();
let count=2;
const employees : Employee[]=[{
    id:412,
    name:"sneha",
    email:"sneha@gmail.com",
    created_at:new Date(),
    updated_at:new Date()
},
{
    id:413,
    name:"tans",
    email:"tans@gmail.com",
    created_at:new Date(),
    updated_at:new Date()
}];



employeeRouter.get('/', (req, res)=>{
    console.log(req.url);
    res.status(200).send(employees);
})

employeeRouter.get('/:id', (req, res)=>{
    console.log(req.url);
    const employeeid:number = Number(req.params.id);
    res.status(200).send(employees.find((emp)=> {
        return employeeid== emp.id;
    }));
})

employeeRouter.post('/', (req, res)=>{
    console.log(req.url);
    const newEmployee= new Employee()
    newEmployee.email=req.body.email;
    newEmployee.name=req.body.name;
    newEmployee.id=++count;
    newEmployee.created_at=new Date;
    newEmployee.updated_at=new Date;
    employees.push(newEmployee);
    res.status(200).send(newEmployee);
})

employeeRouter.put('/:id', (req, res)=>{
    console.log(req.url);
    const employeeid:number = Number(req.params.id);
    const myemp= employees.find((emp)=> {
    return employeeid== emp.id
    });
    myemp.email=req.body.email;
    myemp.name=req.body.name;
    myemp.updated_at=new Date();
    myemp.created_at=new Date();

    res.status(200).send(employees);
})

// employeeRouter.delete('/:id', (req, res)=>{
//     console.log(req.url);
//     const employeeid:number=Number(req.params.id);
//     const empindex 
//     employees.findIndex((emp)=>{
//         emp.id==employeeid
//     });





//     res.status(200).send("employee is created");
// })
employeeRouter.patch('/:id', (req, res)=>{
    console.log(req.url);
    res.status(200).send("employee is created");
})




export {employeeRouter};