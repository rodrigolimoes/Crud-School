import { Controller, Post, Delete, Body, Res, InternalServerErrorException,HttpException, HttpStatus, Get, Put, Param } from '@nestjs/common';
import {Response} from 'express';
import {StudentDto} from './dtos/student.dto';
import {StudentService} from './student.service';

@Controller('student')
export class StudentController {

  constructor(private studentService: StudentService){}

  @Post()
  async createStudent(@Res() res: Response, @Body() body: StudentDto){
    try {
      const {name, email, address, birthDate}  = body;

        let response = await this.studentService.createStudent(
          name, 
          email, 
          address, 
          new Date(birthDate)
        );
        
        if(!response){
          res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Student already exist"});
        }else{
          res.status(HttpStatus.CREATED).send({statusCode: HttpStatus.CREATED, message: "Registration success"});
        }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put("/:id")
  async updateStudent(@Res() res: Response, @Param("id") id: string, @Body() body: StudentDto){
    try {
      const {name, email, address, birthDate}  = body;
  
      await this.studentService.updateStudent(
        id,
        name,
        email,
        address,
        new Date(birthDate)
      );
      
      res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Success update Student"});

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete("/:id")
  async deleteTeacher(@Res() res: Response, @Param("id") id: string){
    try {
      if(id !== undefined){
        await this.studentService.deleteStudent(id);
        res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Success delete Student"});
      }

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
