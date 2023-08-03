import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service"
import employeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";

class EmployeeController{
    public router:express.Router;

    constructor( private employeeService: EmployeeService){
        this.router = express.Router();
        this.router.get('/',this.getAllEmployees);
        this.router.get('/:id',this.getAllEmployeesById);
        this.router.post('/',this.createEmployee);
        this.router.put('/:id',this.updateEmployee);
        this.router.delete(':id',this.deleteEmployee);

    }

    getAllEmployees = async (req:express.Request, res:express.Response)=>{
        const employees= await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
        };

    getAllEmployeesById= async (req:express.Request, res:express.Response,next:NextFunction)=>{
        try{
        const employeeId= Number(req.params.id);
        const employee= await this.employeeService.getAllEmployeeById(employeeId);
        res.status(200).send(employee)}catch (error){
            console.log("some error has occured")
            next(error)
        }
    };

    createEmployee= async (req:express.Request, res:express.Response, next:NextFunction)=>{

        try{
            const createEmployeeDto= plainToInstance(CreateEmployeeDto,req.body);
            const errors=await validate(createEmployeeDto);
            if(errors.length>0){
                console.log(errors);
                throw new ValidationException(400,"Validation error",errors);
            }

            const employee= await this.employeeService.createEmployee(createEmployeeDto.name, createEmployeeDto.email,createEmployeeDto.addres);
            res.status(200).send(employee); 

        }catch(error){
            next(error);
        }

    }
    updateEmployee= async (req:express.Request, res:express.Response,next:NextFunction)=>{
    try{
        const createEmployeeDto= plainToInstance(CreateEmployeeDto,req.body);
            const errors=await validate(createEmployeeDto);
            if(errors.length>0){
                console.log(JSON.stringify(errors));
                throw new ValidationException(400,"Validation error",errors);
    }
    const updateEmployee=await this.employeeService.updateEmployee(Number(req.params.id) ,CreateEmployeeDto.name, createEmployeeDto.email,createEmployeeDto.addres)
    res.status(200).send(updateEmployee);
    }   catch(error){
    next(error);
}
    };
    

    deleteEmployee= async (req:express.Request, res:express.Response,next:NextFunction)=>{
        try{
        const empid=Number(req.params.id);
        const employee= await this.employeeService.deleteEmployee(empid);
        res.status(200).send(employee);
        }catch(error){
            next(error);
        }
    };
}
export default EmployeeController;