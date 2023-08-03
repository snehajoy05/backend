import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{
    constructor(private employeeRepository:EmployeeRepository){}

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
    createEmployee(inputName:string , inputEmail:string,address:any):Promise<Employee>{
        const emp= new Employee()
        emp.name=inputName;
        emp.email=inputEmail;

        const newAddress= new Address()
        newAddress.line1=address.line1;
        newAddress.pin=address.pin;
        emp.address=newAddress;
        return this.employeeRepository.createEmployee(emp);
    }

    async deleteEmployee(id:number):Promise<Employee>{
        const emp=await this.getAllEmployeeById(id=id);

        if(!emp){
            throw new HttpException(404,`Employee not found with id:${id}`);
        }
        return this.employeeRepository.deleteEmployee(emp);

    }

    async updateEmployee(id:number , name:string , email:string,address:any):Promise<Employee>{
        const emp=await this.getAllEmployeeById(id=id);
        if(!emp){
            throw new HttpException(404,`Employee not found with id:${id}`);
        }

        emp.name=name;
        emp.email=email;

        emp.address.line1=address.line1;
        emp.address.pin=address.pin;

        return this.employeeRepository.updateEmployee(emp);

    }
}
export default EmployeeService;