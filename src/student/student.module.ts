import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import {StudentModel, StudentSchema} from './model/student.model';
import {StudentRepository} from './repository/student.repository';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: StudentModel.name, 
      schema:StudentSchema,
      collection: 'student',
    }],'crudschool')],
  providers: [StudentService, StudentRepository],
  controllers: [StudentController],
  exports:[StudentService]
})
export class StudentModule {}

