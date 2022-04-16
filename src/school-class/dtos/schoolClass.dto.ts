import {IsString, IsArray} from 'class-validator';

export class SchoolClassDto {
  
  @IsString()
  teacher: string;

  @IsArray()
  @IsString({each: true})
  students: string[];

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}