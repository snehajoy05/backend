import express, { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Role } from '../utils/role.enum';
import HttpException from '../exception/http.exception';
import ValidationException from '../exception/validation.exception';
import authenticate from '../middleware/authentic.middleware';
import DepartmentService from '../service/department.service';
import authorize from '../middleware/authorize.middleware';
import CreateDepartmentDto from '../dto/create- departmentdto';
import { UpdateDepartmentDto } from '../dto/update-departmentdto';

class DepartmentController {
  public router: express.Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();
    this.router.get('/', authenticate, this.getAllDepartments);
    this.router.get('/:id', authenticate,this.getDepartmentById);
    this.router.post('/', authenticate, authorize([Role.ADMIN,Role.HR]), this.createDepartment);
    this.router.put('/:id', authenticate,authorize([Role.ADMIN,Role.HR]),this.updateDepartment);
    this.router.delete('/:id',authenticate,authorize([Role.ADMIN,Role.HR]),this.deleteDepartment);
  }

  getAllDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departments = await this.departmentService.getAllDepartments();
      res.status(200).send(departments);
    } catch (error) {
      next(error);
    }
  };

  getDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departmentId = Number(req.params.id);
      const department = await this.departmentService.getDepartmentById(departmentId);
      res.status(200).send(department);
    } catch (error) {
      console.log('Some error has occurred');
      next(error);
    }
  };

  createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const createDepartmentDto = plainToInstance(CreateDepartmentDto,req.body);
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        console.log(errors);
        throw new ValidationException(400, 'Validation error', errors);
      }
      const departmentDTO: CreateDepartmentDto = req.body;
      const department = await this.departmentService.createDepartment(departmentDTO);
      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };

  updateDepartment = async (req: Request,res: Response,next: NextFunction) => {
    try {
      const { department_name } = req.body;
      const id = Number(req.params.id);
      //await this.departmentService.getDepartmentById(id);
      const updateDepartmentDto = plainToInstance(UpdateDepartmentDto,req.body);
      const errors = await validate(updateDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new ValidationException(400, 'Validation error', errors);
      }

     // const departmentId = Number(req.params.id);
      const updatedDepartment = await this.departmentService.updateDepartment(department_name,id);
      res.status(200).send(updatedDepartment);
    } catch (error) {
      next(error);
    }
  };

  deleteDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const departmentId = Number(req.params.id);
      const department = await this.departmentService.deleteDepartment(departmentId);
      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };
}

export default DepartmentController;
