import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {StudentModule} from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { SchoolClassModule } from './school-class/school-class.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'crudschool',
      useFactory: async () => ({
        uri: 'mongodb://localhost:27017/crudschool',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    TeacherModule,
    SchoolClassModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
