import { Controller, Post, Get, Put, Delete, BadRequestException, InternalServerErrorException, HttpException, HttpStatus, Param, Body } from '@nestjs/common';
import {SchoolClassService} from './school-class.service';
import {SchoolClassDto} from './dtos/schoolClass.dto';

@Controller('schoolclass')
export class SchoolClassController {

  constructor(private schoolClassService: SchoolClassService){}

  @Post()
  async createSchoolClass(@Body() body: SchoolClassDto
  ){
    try {
      const {teacher, students, startTime, endTime} = body;

      return await this.schoolClassService.createSchoolClass(
        teacher,
        students,
        new Date(startTime),
        new Date(endTime)
      );
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(){
    try {
      return await this.schoolClassService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findById(@Param() id: string){
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
}
