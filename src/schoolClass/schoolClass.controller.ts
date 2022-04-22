import { Controller, Post, Get, Delete, Patch, BadRequestException, InternalServerErrorException, HttpException, HttpStatus, Param, Body,  Query, Res} from '@nestjs/common';
import {Response} from 'express';
import {SchoolClassService} from './schoolClass.service';
import {SchoolClassDto} from './dtos/schoolClass.dto';
import {TimeClassDto} from './dtos/TimeClass.dto';
import {StudentsClassDto} from './dtos/studentsCLass.dto';

@Controller('schoolclass')
export class SchoolClassController {

  constructor(private schoolClassService: SchoolClassService){}

  @Post()
  async createSchoolClass(@Res() res:Response, @Body() body: SchoolClassDto
  ){
    try {
      const {teacher, students, startTime, endTime} = body;

        let response = await this.schoolClassService.createSchoolClass(
          teacher,
          students,
          startTime,
          endTime
        );

        if(response){
          res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: `Success create school class`});
        }  
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('/:id/student')
  async addStudents(@Res() res: Response, @Param("id") id: string, @Body() body: StudentsClassDto){
    try {
      const {students} = body;
      
        let response = await this.schoolClassService.addStudents(id, students);

        if(response){
          res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Success register Students"});
        }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      return await this.schoolClassService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  

  @Patch('/:id/teacher')
  async changeTeacher(@Res() res: Response, @Param("id") id: string, @Query('idTeacher') idTeacher: string){
    try {
      await this.schoolClassService.changeTeacher(id, idTeacher);

      res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Success Change Teacher"});
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/:id')
  async deleteSchoolClass(@Res() res: Response,@Param("id") id: string){
    try {
      if(id){
        await this.schoolClassService.deleteSchoolClass(id);
        res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Success Delete"});
      }else{
        res.status(HttpStatus.BAD_REQUEST).send({statusCode: HttpStatus.BAD_REQUEST, message: "Invalid Id"});
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('/:id')
  async updateTimesClass(@Res() res: Response, @Param("id") id: string, @Body() body: TimeClassDto){
    try {
      const {startTime, endTime} = body;

      if(id && startTime && endTime){
        await this.schoolClassService.updateTimes(id, startTime, endTime);

        res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Success  update Times"});
      }else{
        res.status(HttpStatus.BAD_REQUEST).send({statusCode: HttpStatus.BAD_REQUEST, message: "Invalid Data"});
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete("/:id/student")
  async deleteStudent(
    @Res() res: Response,
    @Param("id") id: string, 
    @Query("idStudent") idStudent: string
    ){
    try {

      if(id && idStudent){
        let response  = await this.schoolClassService.removeStudent(id, idStudent);

        if(response){
          res.status(HttpStatus.OK).send({statusCode: HttpStatus.OK, message: "Success Delete"});
        }
      }else{
        res.status(HttpStatus.BAD_REQUEST).send({statusCode: HttpStatus.BAD_REQUEST, message: "Invalid Data"});
      }
    } catch (error) {
      throw error;
    }
  }
}
