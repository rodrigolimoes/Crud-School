import { Controller, Post, Delete, Body, BadRequestException, InternalServerErrorException,HttpException, HttpStatus, Get, Put, Param } from '@nestjs/common';
import {StudentDto} from './dtos/student.dto';
import {StudentService} from './student.service';

@Controller('student')
export class StudentController {

  constructor(private studentService: StudentService){}

  @Post()
  async createStudent(@Body() body: StudentDto){
    try {
      const {name, email, address, birthDate}  = body;

      if(name && email && address && birthDate){
        let response = await this.studentService.createStudent(
          name, 
          email, 
          address, 
          new Date(birthDate)
        );
        
        if(!response){
          return new HttpException({status: HttpStatus.OK, message:"Student already exist", error: ""}, HttpStatus.OK).getResponse();
        }else{
          return new HttpException({status: HttpStatus.CREATED, message:"Registration success", error: ""}, HttpStatus.CREATED).getResponse();
        }
      }else{
        throw new BadRequestException('Invalid Data');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put("/:id")
  async updateStudent(@Param("id") id: string, @Body() body: StudentDto){
    try {
      const {name, email, address, birthDate}  = body;

      let response = await this.studentService.updateStudent(
        id,
        name,
        email,
        address,
        new Date(birthDate)
      );

      return new HttpException({ status: HttpStatus.OK, message:"Success update Student"},HttpStatus.OK).getResponse();

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete("/:id")
  async deleteTeacher(@Param("id") id: string){
    try {
      let response = await this.studentService.deleteStudent(id);

      return new HttpException({ status: HttpStatus.OK, message:"Success delete Student"},HttpStatus.OK).getResponse();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll(){
    try {
      return await this.studentService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get("/:id")
  async findById(@Param("id") id: string){
    try {
      return await this.studentService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
