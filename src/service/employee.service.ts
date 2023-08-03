import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{
    constructor(private employeeRepository:EmployeeRepository){}

    getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.find();
    }
    getAllEmployeeById(id:number):Promise<Employee|null>{
        return this.employeeRepository.findOneBy(id);
}
    createEmployee(inputName:string , inputEmail:string):Promise<Employee>{
        const emp= new Employee()
        emp.name=inputName;
        emp.email=inputEmail;
        return this.employeeRepository.createEmployee(emp);
    }
}
export default EmployeeService;