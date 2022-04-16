import {IsString} from 'class-validator';

export class TeacherDto {

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsString()
  birthDate: string;

  @IsString()
  subject: string;
}