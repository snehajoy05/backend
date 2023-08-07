import CreateDepartmentDto from "../dto/create- departmentdto";
import Department from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
    constructor(private departmentRepository: DepartmentRepository) {}
  
    getAllDepartments(): Promise<Department[]> {
      return this.departmentRepository.find();
    }
  
    async getDepartmentById(id: number): Promise<Department | null> {
      const department = await this.departmentRepository.findOneBy(id);
  
      if (!department) {
        throw new HttpException(404, `Department not found with id: ${id}`);
      }
  
      return department;
    }
  
    async createDepartment(departmentDTO:CreateDepartmentDto): Promise<Department> {
      const department = new Department();
      department.department_name = departmentDTO.department_name;
      return this.departmentRepository.createDepartment(department);
    }
  
    async deleteDepartment(id: number): Promise<Department> {
      const department = await this.getDepartmentById(id);
  
      if (!department) {
        throw new HttpException(404, `Department not found with id: ${id}`);
      }
  
      return this.departmentRepository.deleteDepartment(department);
    }
  
    async updateDepartment(department_name: string,id:number): Promise<Department> {
      const department = await this.departmentRepository.findOneBy(id);
      
  
      if (!department) {
        throw new HttpException(404, `Department not found with id: ${id}`);
      }
  
      department.department_name = department_name;
      return this.departmentRepository.updateDepartment(department);
    }

  }
  
  export default DepartmentService;