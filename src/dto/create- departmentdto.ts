import { IsNotEmpty, IsString } from "class-validator";

class CreateDepartmentDto{

    @IsNotEmpty()
    @IsString()
    department_name:string;
}
export default CreateDepartmentDto;