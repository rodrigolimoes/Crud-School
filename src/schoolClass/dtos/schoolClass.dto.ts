import {IsString, IsArray, IsNotEmpty} from 'class-validator';

export class SchoolClassDto {
  
  @IsNotEmpty({message: "Required Teacher"})
  @IsString()
  teacher: string;

  @IsNotEmpty({message: "Required Students"})
  @IsArray()
  @IsString({each: true})
  students: string[];

  @IsNotEmpty({message: "Required Start Time"})
  @IsString()
  startTime: string;

  @IsNotEmpty({message: "Required End Time"})
  @IsString()
  endTime: string;
}