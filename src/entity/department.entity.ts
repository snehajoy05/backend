import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Employee from "./employee.entity";

@Entity("department")

class Department extends AbstractEntity{

    @Column()
    department_name:string;

    @OneToMany(()=>Employee,(employee)=>employee.department)
    employees:Employee[];
}
export default Department;