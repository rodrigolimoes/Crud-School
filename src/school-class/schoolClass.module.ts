import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolClassSchema, SchoolClassModel } from './model/schoolClass.model';
import { SchoolClassController } from './schoolClass.controller';
import { SchoolClassService } from './schoolClass.service';
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
