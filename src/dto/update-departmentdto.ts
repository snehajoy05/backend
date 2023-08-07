import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    department_name: string;
  }