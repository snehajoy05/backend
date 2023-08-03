import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./employee.entity";

@Entity()
class Address{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    line1:string;

    @Column()
    pin:string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @DeleteDateColumn()
    deleted_at:Date;

    @OneToOne(()=> Employee,(employee)=> employee.address)
    @JoinColumn()
    employee:Employee;
}
export default  Address;