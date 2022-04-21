import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherModel, TeacherSchema } from './model/teacher.model';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import {TeacherRepository} from './repository/teacher.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
    {
      name: TeacherModel.name,
      schema: TeacherSchema,
      collection: 'teacher',
    }
    ], 'crudschool')
  ],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository],
  exports:[TeacherRepository]
})
export class TeacherModule {}

