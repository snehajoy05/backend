import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service"
import employeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import ValidationException from "../exception/validation.exception";
import authenticate from "../middleware/authentic.middleware";
import authorize from "../middleware/authorize.middleware";
import UpdateEmployeeDto from "../dto/update-employee";
import { Role } from "../utils/role.enum";
import logger from "../logger/logger";

class EmployeeController{
    public router:express.Router;

    constructor( private employeeService: EmployeeService){
        this.router = express.Router();
        this.router.get('/',authenticate,this.getAllEmployees);
        this.router.get('/:id',authenticate,this.getAllEmployeesById);
        this.router.post('/',authenticate,authorize([Role.ADMIN,Role.HR]),this.createEmployee);
        this.router.put('/:id',authenticate,authorize([Role.ADMIN,Role.HR]),this.updateEmployee);
        this.router.delete('/:id',authenticate,authorize([Role.ADMIN,Role.HR]),this.deleteEmployee);
        this.router.post('/:login',this.loginEmployee);

    }

    getAllEmployees = async (req:express.Request, res:express.Response)=>{
        const reqStart=Date.now();
        const employees= await this.employeeService.getAllEmployees();
        logger.info("all employees obtained");
        res.status(200).send({data:employees,errors:null,message:"OK",meta:{length:Employee.length,took:Date.now()}})};

    getAllEmployeesById= async (req:express.Request, res:express.Response,next:NextFunction)=>{
        try{
        const employeeId= Number(req.params.id);
        const reqStart=Date.now();

        const employee= await this.employeeService.getAllEmployeeById(employeeId);
        logger.info("employee obtained with id");
        res.status(200).send({data:employee,errors:null,message:"OK",meta:{length:Employee.length,took:Date.now()}})}catch (error){
            logger.error("some error has occured");
            next(error)
        }
    };

    createEmployee= async (req:express.Request, res:express.Response, next:NextFunction)=>{

        try{
            const createEmployeeDto= plainToInstance(CreateEmployeeDto,req.body);
            const reqStart=Date.now();

            const errors=await validate(createEmployeeDto);
            if(errors.length>0){
                logger.error("error has occured ");
                throw new ValidationException(400,"Validation error",errors);
            }
            const employeeDTO: CreateEmployeeDto = req.body;
            const employee= await this.employeeService.createEmployee(employeeDTO);
            logger.info("employee created");
            res.status(200).send({data:employee,errors:null,message:"OK",meta:{length:Employee.length,took:Date.now()}}); 

        }catch(error){
            next(error);
        }

    }

    public loginEmployee= async(req:express.Request, res:express.Response, next:NextFunction
    )=>{
        const {username,password}=req.body;
        try{
            const {token,employee} = await this.employeeService.loginEmployee(username,password);
            logger.info("user has logged in");
            res.status(200).send({data:token,employeedetails:employee,errors:null,message:"OK"})
        }catch(error){
            next(error)
        }
    }


    updateEmployee= async (req:express.Request, res:express.Response,next:NextFunction)=>{
    try{
        const id = Number(req.params.id);
        await this.employeeService.getAllEmployeeById(id);

        const updateEmployeeDto= plainToInstance(UpdateEmployeeDto,req.body);
            const errors=await validate(updateEmployeeDto);
            if(errors.length>0){
                console.log(JSON.stringify(errors));
                throw new ValidationException(400,"Validation error",errors);
    }
    const employee=await this.employeeService.updateEmployee(id, updateEmployeeDto);
    logger.info("employee updated");
    res.status(200).send({data:employee,errors:null,message:"OK"});
    }   catch(error){
    next(error);
    }
    };


    deleteEmployee= async (req:express.Request, res:express.Response,next:NextFunction)=>{
            const id = Number(req.params.id);
            const employee = await this.employeeService.deleteEmployee(id);
            logger.info("employee has been deleted");
            res.status(200).send(employee);
          };
};
export default EmployeeController;