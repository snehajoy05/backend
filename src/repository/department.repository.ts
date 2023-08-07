import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
    constructor(private departmentRepository: Repository<Department>) {}
  
    find(): Promise<Department[]> {
      return this.departmentRepository.find();
    }
  
    findOneBy(id: number): Promise<Department> {
      return this.departmentRepository.findOne({
        where: { id: id },
      });
    }
  
    createDepartment(department: Department): Promise<Department> {
      return this.departmentRepository.save(department);
    }
  
    async deleteDepartment(department: Department): Promise<Department> {
      return this.departmentRepository.remove(department);
    }
  
    async updateDepartment(department: Department): Promise<Department> {
      return this.departmentRepository.save(department);
    }
  }
  
  export default DepartmentRepository;