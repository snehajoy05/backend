import { DataSource, Repository } from "typeorm";
// import dataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";

class EmployeeRepository{
    constructor(private employeeRepository:Repository<Employee>){}
    
    find():Promise<Employee[]>{
        return this.employeeRepository.find();
    }
    findOneBy(id:number):Promise<Employee>{
        return this.employeeRepository.findOneBy({
                id:id,
            });
    }
    createEmployee(employee:Employee):Promise<Employee>{
        return this.employeeRepository.save(employee);
    }
}
export default EmployeeRepository;