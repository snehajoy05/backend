import { IsNotEmpty, IsString } from "class-validator";

class CreateAddressDto{

@IsNotEmpty()
@IsString()
line1:string;

@IsNotEmpty()
@IsString()
pin:string;
}
export default CreateAddressDto;