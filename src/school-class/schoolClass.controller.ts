import { Controller, Post, Get, Delete, Patch, BadRequestException, InternalServerErrorException, HttpException, HttpStatus, Param, Body,  Query } from '@nestjs/common';
import {SchoolClassService} from './schoolClass.service';
import {SchoolClassDto} from './dtos/schoolClass.dto';

@Controller('schoolclass')
export class SchoolClassController {

  constructor(private schoolClassService: SchoolClassService){}

  @Post()
  async createSchoolClass(@Body() body: SchoolClassDto
  ){
    try {
      const {teacher, students, startTime, endTime} = body;

      if(teacher && students && startTime && endTime){
        let response = await this.schoolClassService.createSchoolClass(
          teacher,
          students,
          startTime,
          endTime
        );

        if(response){
          throw new HttpException({statusCode: HttpStatus.OK, message: `Success create school class`}, HttpStatus.OK);
        }  
      }else{
        throw new BadRequestException('Invalid Data');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('/:id/student')
  async addStudents(@Param("id") id: string, @Body() body: SchoolClassDto){
    try {
      const {students} = body;
      
      if(students && students.length > 0){
        let response = await this.schoolClassService.addStudents(id, students);

        if(response){
          throw new HttpException({statusCode: HttpStatus.OK, message: "Success register"}, HttpStatus.OK);
        }else{
          throw new BadRequestException('Falid in add students');
        }
      }else{
        throw new BadRequestException('Invalid Data');
      }

    } catch (error) {
      throw new HttpException({statusCode: error.status, message: error.message}, error.status);
    }
  }

  @Get()
  async findAll(){
    try {
      return await this.schoolClassService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/:id')
  async findById(@Param("id") id: string){
    try {
      if(id){
        return await this.schoolClassService.findById(id);
      }else{
        throw new BadRequestException('Invalid Data');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('/:id/teacher')
  async changeTeacher(@Param("id") id: string, @Body() body: SchoolClassDto){
    try {
      const {teacher} = body;

      if(teacher){
        return await this.schoolClassService.changeTeacher(id, teacher);
      }else{
        throw new BadRequestException('Invalid Data');
      }

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/:id')
  async deleteSchoolClass(@Param("id") id: string){
    try {
      if(id){
        return await this.schoolClassService.deleteSchoolClass(id);
      }else{
        throw new BadRequestException('Invalid Data');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('/:id')
  async updateTimesClass(@Param("id") id: string, @Body() body: SchoolClassDto){
    try {
      const {startTime, endTime} = body;

      if(id && startTime && endTime){
        return await this.schoolClassService.updateTimes(id, startTime, endTime);
      }else{
        throw new BadRequestException('Invalid Data');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete("/:id/student")
  async deleteStudent(
    @Param("id") id: string, 
    @Query("idStudent") idStudent: string
    ){
    try {

      if(id && idStudent){
        console.log(id, idStudent)
        let response  = await this.schoolClassService.removeStudent(id, idStudent);

        if(response){
          throw new HttpException({statusCode: HttpStatus.OK, message: "Success Delete"}, HttpStatus.OK);
        }
      }else{
        throw new BadRequestException('Invalid Data');
      }
    } catch (error) {
      throw error;
    }
  }
}
