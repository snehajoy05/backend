import { DataSource, Repository } from "typeorm";
import dataSource from "../db/postgres.db";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";

class EmployeeRepository{
    softRemove: jest.Mock<any, any, any>;
    constructor(private employeeRepository:Repository<Employee>){}
    
    find():Promise<Employee[]>{
        return this.employeeRepository.find();
    }
    findOneBy(id:number):Promise<Employee>{
        return this.employeeRepository.findOne({
                where:{id:id},
                relations:{
                    address:true,
                },
            });
    };

    findOneByUsername(username:string):Promise<Employee>{
        return this.employeeRepository.findOne({
                where:{username},
                relations:{
                    address:true,
                },
            });
    };
    createEmployee(employee:Employee):Promise<Employee>{
        return this.employeeRepository.save(employee);
    }

    async deleteEmployee(id:number):Promise<Employee>{
        const employeedelete = await this.findOneBy(id);
        return this.employeeRepository.softRemove(employeedelete);
    }

    async updateEmployee(id: number, updateEmployeeDto: any): Promise<Employee> {
        const newEmployee = {id: id,...updateEmployeeDto,address: updateEmployeeDto.address? {
                id: (await this.generateIDAddress(id)).id,...updateEmployeeDto.address,
            }
            : undefined,
        };
        const employee = await this.employeeRepository.preload(newEmployee);
    
        return this.employeeRepository.save(employee);
}

async generateIDAddress(id): Promise<Address> {
    const employee = await this.findOneBy(id);
    return employee.address;
  }
}

export default EmployeeRepository;