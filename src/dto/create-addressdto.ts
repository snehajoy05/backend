import { IsNotEmpty, IsString } from "class-validator";

class CreateAddressDto{

@IsNotEmpty()
@IsString()
line1:string;

@IsNotEmpty()
@IsString()
line2: string;

@IsNotEmpty()
@IsString()
city: string;

@IsNotEmpty()
@IsString()
state: string;

@IsNotEmpty()
@IsString()
country: string;

@IsNotEmpty()
@IsString()
pin: string;
}
export default CreateAddressDto;