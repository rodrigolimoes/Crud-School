import {IsString} from 'class-validator';

export class StudentDto {
  
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsString()
  birthDate: string;
}