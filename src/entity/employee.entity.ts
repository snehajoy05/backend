import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract-entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity("employees")

class Employee extends AbstractEntity{

    @Column()
    name:string;

    @Column()
    username: string;

    // @Column()
    // email:string;

    // @Column({nullable: true})
    // age:number;

    @Column()
    password:string;

    @OneToOne(()=> Address,(address)=>address.employee,{cascade:true})
    address:Address;

    @Column({default:Role.USER})
    role:Role;

    @Column()
    joiningDate: string;

    @Column()
    experience: number;

 
    @ManyToOne(() => Department,(department)=>department.employees,{cascade:true})
    @JoinColumn()
    department :Department;

    
}

export default Employee;
