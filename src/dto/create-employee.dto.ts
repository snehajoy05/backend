import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import Address from "../entity/address.entity";
import CreateAddressDto from "./create-addressdto";

class CreateEmployeeDto{
@IsNotEmpty()
@IsString()
name:string;

@IsNotEmpty()
@IsString()
email: string;

@IsNotEmpty()
@ValidateNested({each:true})
@Type(()=> CreateAddressDto)
addres:Address;
}
export default CreateEmployeeDto;