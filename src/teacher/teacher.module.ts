import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherModel, TeacherSchema } from './model/teacher.model';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

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
  providers: [TeacherService],
})
export class TeacherModule {}

