import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./employee.entity";
import AbstractEntity from "./abstract-entity";

@Entity()
class Address extends AbstractEntity{

    @Column()
    line1:string;

    @Column()
    line2: string;

    @Column()
    city: string;

    @Column()
    pin:string;

    @Column()
    state: string;

    @Column()
    country: string;

    @OneToOne(()=> Employee,(employee)=> employee.address)
    @JoinColumn()
    employee:Employee;

}
export default  Address;