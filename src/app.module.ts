import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {StudentModule} from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { SchoolClassModule } from './schoolClass/schoolClass.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'crudschool',
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('URL_DB'),
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
