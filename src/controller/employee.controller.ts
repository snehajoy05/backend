import express from "express";
import EmployeeService from "../service/employee.service"
import employeeRepository from "../repository/employee.repository";
import Employee from "../entity/employee.entity";

class EmployeeController{
    public router:express.Router;

    constructor( private employeeService: EmployeeService){
        this.router = express.Router();
        this.router.get('/',this.getAllEmployees);
        this.router.get('/:id',this.getAllEmployeesById);
        this.router.post('/',this.createEmployee);

    }

    getAllEmployees = async (req:express.Request, res:express.Response)=>{
        const employees= await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
        };

    getAllEmployeesById= async (req:express.Request, res:express.Response)=>{
        const employeeId= Number(req.params.id);
        const employee= await this.employeeService.getAllEmployeeById(employeeId);
        res.status(200).send(employeeId);
    };

    createEmployee= async (req:express.Request, res:express.Response)=>{
        const inputName= req.body.name;
        const inputEmail=req.body.email;
        // const employeeId= Number(req.params.id);
        const employee= await this.employeeService.createEmployee(inputName, inputEmail);
        res.status(200).send(employee); 
    };
}
export default EmployeeController;