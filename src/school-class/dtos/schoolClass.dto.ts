import {IsString, IsArray, IsOptional} from 'class-validator';

export class SchoolClassDto {
  
  @IsOptional()
  @IsString()
  teacher: string;

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  students: string[];

  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  endTime: string;
}