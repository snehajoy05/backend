import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Role } from "../utils/role.enum";
import UpdateAddressDto from "./update-addressdto";

class UpdateEmployeeDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: Address;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    joiningDate : string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    experience : number;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    departmentId:string;


}
export default UpdateEmployeeDto;