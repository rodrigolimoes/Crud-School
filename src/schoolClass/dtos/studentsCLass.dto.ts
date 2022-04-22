import {IsString, IsArray, IsNotEmpty} from 'class-validator';

export class StudentsClassDto {

  @IsNotEmpty({message: "Required Students"})
  @IsArray()
  @IsString({each: true})
  students: string[];
}