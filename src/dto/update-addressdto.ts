import { IsNotEmpty, IsString } from "class-validator";

class UpdateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsNotEmpty()
    @IsString()
    line2: string;

    @IsNotEmpty()
    @IsString()
    city: string;


    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    pin: string;
}

export default UpdateAddressDto;