import { Controller, Post, Get, Put, Delete, BadRequestException, InternalServerErrorException, HttpException, HttpStatus, Param, Body } from '@nestjs/common';
import {TeacherDto} from './dtos/teacher.dto';
import {TeacherService} from './teacher.service';

@Controller('teacher')
export class TeacherController {

  constructor(private teacherService: TeacherService){}

  @Post()
  async createTeacher(@Body() body: TeacherDto){
    try {
      const {name, email, address, birthDate, subject} = body;
      
      if(name && email && address && birthDate && subject){
        let response = await this.teacherService.createTeacher(
          name,
          email,
          address,
          new Date(birthDate),
          subject
        );
        
        if(!response){
          return new HttpException({status: HttpStatus.OK, message:"Teacher already exist", error: ""}, HttpStatus.OK).getResponse();
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

  @Put('/:id')
  async updateTeacher(@Param("id") id: string, @Body() body: TeacherDto){
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

      return new HttpException({ status: HttpStatus.OK, message:"Success update Student"},HttpStatus.OK).getResponse();

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete("/:id")
  async deleteTeacher(@Param("id") id: string){
    try {
      let response = await this.teacherService.deleteTeacher(id);

      return new HttpException({ status: HttpStatus.OK, message:"Success delete Teacher"},HttpStatus.OK).getResponse();

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
