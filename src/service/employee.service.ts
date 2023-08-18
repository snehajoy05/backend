import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";
import { Role } from "../utils/role.enum";
import CreateEmployeeDto from "../dto/create-employee.dto";
import UpdateEmployeeDto from "../dto/update-employee";
import Department from "../entity/department.entity";
import DepartmentService from "./department.service";

class EmployeeService{
    constructor(private employeeRepository:EmployeeRepository,private departmentService:DepartmentService){}

    getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.find();
    }
    async getAllEmployeeById(id:number):Promise<Employee|null>{
        const emp=await this.employeeRepository.findOneBy(id);
    
    if(!emp){
    throw new HttpException( 404,`Employee not found with id:  ${id}`);
    }
    return(emp);
    
};


    async createEmployee(employeeDTO: CreateEmployeeDto): Promise<Employee> {
            const emp = new Employee();
            emp.name = employeeDTO.name;
            emp.username = employeeDTO.username;
            emp.password = await bcrypt.hash(employeeDTO.password, 10);
            emp.role = employeeDTO.role;
            emp.experience= employeeDTO.experience;
            emp.joiningDate=employeeDTO.joiningDate;
        
            const newAddress = new Address();
            newAddress.line1 = employeeDTO.address.line1;
            newAddress.line2 = employeeDTO.address.line2;
            newAddress.city = employeeDTO.address.city;

            newAddress.state = employeeDTO.address.state;
            newAddress.country = employeeDTO.address.country;
            newAddress.pin = employeeDTO.address.pin;
            emp.address = newAddress;


            // fetch dep employeeDTO.departmentId
            const department=await this.departmentService.getDepartmentById(employeeDTO.departmentId);
            if(!department){
                throw new HttpException(401,"department not found");
            }
            emp.department=department;
            emp.departmentId=employeeDTO.departmentId;
   
        return this.employeeRepository.createEmployee(emp);
    }

    async loginEmployee(username:string,password:string){
        const employee= await this.employeeRepository.findOneByUsername(username);
        if(!employee){
            throw new HttpException(401,"employee not found")
        }

        const result=await bcrypt.compare(password,employee.password);
        if(!result){
            throw new HttpException(401,"incorrect username or password")
        }
        const payload={
            name:employee.name,
            username:employee.username,
            role:employee.role
        }
        const token=jsonWebToken.sign(payload,"ABCDE",{
            expiresIn:"5d"
        });
        return {token,employee}
    }
    

    async deleteEmployee(id:number):Promise<Employee>{
        //const emp=await this.getAllEmployeeById(id=id);

        // if(!emp){
        //     throw new HttpException(404,`Employee not found with id:${id}`);
        // }
    
        return this.employeeRepository.deleteEmployee(id);

    }



    async updateEmployee(id:number , updateEmployeeDto:UpdateEmployeeDto):Promise<Employee>{
        const emp=await this.getAllEmployeeById(id);
        if(!emp){
           throw new HttpException(404,`Employee not found with id:${id}`);
        }

        // emp.name=name;
        // emp.username=username;

        // emp.address.line1=address.line1;
        // emp.address.pin=address.pin;

        const {departmentId,...others}=updateEmployeeDto;

        const newupdateEmployeeDto = { department: departmentId, ...others };

        return await this.employeeRepository.updateEmployee(id,newupdateEmployeeDto);

    }
    
}
export default EmployeeService;