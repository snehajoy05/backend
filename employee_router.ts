import express from "express";
import Employee from "./employee";
import { Client } from 'pg';
import { DataSource, FindOptionsWhere, Like } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dataSource from "./data-source";
import employee from "./employee";

const employeeRouter = express.Router();



employeeRouter.get('/', async (req, res)=>{
    const nameFilter = req.query.name as string;
    const emailFilter = req.query.email as string;
    const employeeRepository= dataSource.getRepository(Employee);
    
    const qb=employeeRepository.createQueryBuilder();
    if(nameFilter){
        qb.andWhere("name Like :name", {name:`${nameFilter}%`})
    }
    if(emailFilter){
        qb.andWhere("email Like :email", {email:`${emailFilter}%`})

    }
    
    const employees = await qb.getMany();
    res.status(200).send(employees);
});

employeeRouter.get('/:id', async (req, res)=>{
     
    const employeeRepository= dataSource.getRepository(Employee);
    const employee= await employeeRepository.findOneBy({
        id:Number (req.params.id)
    });

    res.status(200).send(employee);

});



    // const result = await client.query("SELECT * FROM employees WHERE ID=$1",[
    //     req.params.id
    // ]);
    // const employee= result.rows[0];
    // res.status(200).send(employee);
    // console.log(req.url);
    // const employeeid:number = Number(req.params.id);
    // res.status(200).send(employees.find((emp)=> {
    //     return employeeid== emp.id;
    // }));

employeeRouter.post('/', async (req, res)=>{
    const newEmployee= new Employee()
    newEmployee.email=req.body.email;
    newEmployee.name=req.body.name;
    
    const employeeRepository= dataSource.getRepository(Employee);
    const savedemployee = await employeeRepository.save(newEmployee);
    res.status(200).send(savedemployee);

});




employeeRouter.put('/:id', async (req, res)=>{
    const employeeRepository= dataSource.getRepository(Employee);

    const myemp= await employeeRepository.findOneBy({
        id:Number (req.params.id)
    });
    myemp.email=req.body.email;
    myemp.name=req.body.name;
    myemp.updated_at=new Date();

    const savedemployee = await employeeRepository.save(myemp);

    res.status(200).send(savedemployee);
});

employeeRouter.delete('/:id', async (req, res)=>{
    const employeeRepository= dataSource.getRepository(Employee);

    const myemp= await employeeRepository.findOneBy({
        id:Number (req.params.id)
    });
    console.log(myemp);

    const savedemployee = await employeeRepository.softRemove(myemp);

    res.status(200).send();
});

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

function like(arg0: string): string | import("typeorm").FindOperator<string> {
    throw new Error("Function not implemented.");
}
