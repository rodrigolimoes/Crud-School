import { Controller, Post, Get, Put, Delete, Res, InternalServerErrorException, HttpException, HttpStatus, Param, Body } from '@nestjs/common';
import {Response} from 'express';
import {TeacherDto} from './dtos/teacher.dto';
import {TeacherService} from './teacher.service';

@Controller('teacher')
export class TeacherController {

  constructor(private teacherService: TeacherService){}

  @Post()
  async createTeacher(@Body() body: TeacherDto, @Res() res: Response){
    try {
      const {name, email, address, birthDate, subject} = body;
      
        let response = await this.teacherService.createTeacher(
          name,
          email,
          address,
          new Date(birthDate),
          subject
        );
        
        if(!response){
          res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Teacher already exist"});
        }else{
          res.status(HttpStatus.CREATED).send({statusCode: HttpStatus.CREATED, message: "Registration success"});
        }
      
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/:id')
  async updateTeacher(@Res() res: Response,@Param("id") id: string, @Body() body: TeacherDto){
    try {
      const {name, email, address, birthDate, subject} = body;
      
      let response = await this.teacherService.updateTeacher(
        id,
        name,
        email,
        address,
        new Date(birthDate),
        subject
      );
      
      res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message:"Success update Teacher"});
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete("/:id")
  async deleteTeacher(@Res() res: Response, @Param("id") id: string){
    try {
      await this.teacherService.deleteTeacher(id);

      res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message:"Success delete Teacher"});
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: string){
    try {
      return await this.teacherService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('')
  async findAll(){
    try {
      return await this.teacherService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
