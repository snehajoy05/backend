import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import EmployeeService from "../../service/employee.service";
import departmentService from "../../service/department.service";
import CreateEmployeeDto from "../../dto/create-employee.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import bcrypt from "bcrypt";
import UpdateEmployeeDto from "../../dto/update-employee";
import Department from "../../entity/department.entity";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service";
import CreateDepartmentDto from "../../dto/create- departmentdto";
import CreateAddressDto from "../../dto/create-addressdto";
import UpdateAddressDto from "../../dto/update-addressdto";
import jsonWebToken from "jsonwebtoken";
import LoginEmployeeDto from "../../dto/create-logindto";

describe('employee service test',()=>{
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let departmentService:DepartmentService;
    let departmentRepository:DepartmentRepository;
    let employee: Employee;
beforeAll(()=>{
        const dataSource:DataSource={
            getRepository : jest.fn()
        } as unknown as DataSource

        employeeRepository=new EmployeeRepository(
            dataSource.getRepository(Employee)
        );
        departmentRepository=new DepartmentRepository(
            dataSource.getRepository(Department)
            );
        departmentService=new DepartmentService(departmentRepository)

     employeeService=new EmployeeService(employeeRepository,departmentService);

     employee = plainToClass(Employee, {
        id: 1,username:"ash",password:"ashok"});
     
    });

describe('test for getEmployeeById',()=>{

    test('test employee for id',async()=>{
        const mockFunction = jest.fn();
        when(mockFunction).calledWith(1).mockResolvedValueOnce({id:1});
        employeeRepository.findOneBy=mockFunction;
        const employee = await employeeService.getAllEmployeeById(1);
        expect(employee).toStrictEqual({id:1});
    });

describe('get all employees',()=>{

    test('should return users successfully',async()=>{
        const spy = jest.spyOn(employeeRepository,'find');
        spy.mockResolvedValue([]);
        const users = await employeeService.getAllEmployees();
        expect(users).toStrictEqual([]);
        expect(spy).toBeCalledTimes(1);
    })
})

describe('delete employee',()=>{
    test('delete employee with id',async()=>{
        const mockFunction = jest.fn();
        when(mockFunction).calledWith(2).mockResolvedValueOnce({id:2});
        employeeRepository.findOneBy=mockFunction;
        const employee = await employeeService.getAllEmployeeById(2);
        employeeRepository.softRemove=mockFunction;
        expect(employee).toStrictEqual({id:2});
    })
})

describe ('new employee',()=>{
    test('created employee',async()=>{
        const getDepartmentByIdMock = jest.fn();
        const createEmployeeMock = jest.fn();
        const createEmployeeDto: CreateEmployeeDto = plainToClass(CreateEmployeeDto, {
            name: "Emp1",
            address: plainToClass(CreateAddressDto, {
                line1: "line1"
            })
        }) 
        departmentService.getDepartmentById = getDepartmentByIdMock;
        getDepartmentByIdMock.mockResolvedValueOnce({id: 1})
        employeeRepository.createEmployee = createEmployeeMock;
        createEmployeeMock.mockResolvedValue(employee)

    })

})

describe ('update employee',()=>{
    test('updated employee',async()=>{
        const getAllEmployeeByIdMock = jest.fn();
        const updateEmployeeMock = jest.fn();
        const updateEmployeeDto: UpdateEmployeeDto = plainToClass(UpdateEmployeeDto, {
            name: "Emp1",
            address: plainToClass(UpdateAddressDto, {
                line1: "line1"
            })
        }) 
        getAllEmployeeByIdMock.mockResolvedValueOnce({id: 1})
        employeeRepository.updateEmployee = updateEmployeeMock;
        updateEmployeeMock.mockResolvedValue(employee)

    })

})


describe('test for loginEmployee', () => {
    const loginEmployeeDto: LoginEmployeeDto = plainToClass(LoginEmployeeDto, {
        username: "ash", 
        password: "ashok"
    })
    test(`should throw not fount exception if employee doesn't exist`, async () => {
        const findEmplyeeByUserNameMock = jest.fn();
        employeeRepository.findOneByUsername = findEmplyeeByUserNameMock;
        findEmplyeeByUserNameMock.mockResolvedValue(null);
        expect(
            async () => await employeeService.loginEmployee(loginEmployeeDto.username,loginEmployeeDto.password)
          ).rejects.toThrowError("employee not found");
    })
    test(`should throw error on password missmatch`, async () => {
        const findEmplyeeByUserNameMock = jest.fn();
        employeeRepository.findOneByUsername = findEmplyeeByUserNameMock;
        findEmplyeeByUserNameMock.mockResolvedValue(employee);
        bcrypt.compare=jest.fn().mockResolvedValue(false);
            expect(
            async () => await employeeService.loginEmployee(loginEmployeeDto.username,loginEmployeeDto.password)
          ).rejects.toThrowError("incorrect username or password");
    })
    // test(`should login`, async () => {
    //     const findEmplyeeByUserNameMock = jest.fn();
    //     employeeRepository.findOneByUsername = findEmplyeeByUserNameMock;
    //     findEmplyeeByUserNameMock.mockResolvedValue(employee);
    //     bcrypt.compare=jest.fn().mockResolvedValue(true);
    //     jsonWebToken.sign=jest.fn().mockResolvedValue("afdass");
    //     expect (await employeeService.loginEmployee(loginEmployeeDto.username,loginEmployeeDto.password)).toStrictEqual("afdass")
    // })
})
})

});
