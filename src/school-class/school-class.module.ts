import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolClassSchema, SchoolClassModel } from './model/school-class.model';
import { SchoolClassController } from './school-class.controller';
import { SchoolClassService } from './school-class.service';
import {StudentModule} from '../student/student.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: SchoolClassModel.name,
        schema: SchoolClassSchema,
        collection: 'schoolclass'
      }
    ], 'crudschool'),
    StudentModule
  ],
  controllers: [SchoolClassController],
  providers: [SchoolClassService]
})
export class SchoolClassModule {}
