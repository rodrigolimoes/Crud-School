import {IsString, IsNotEmpty} from 'class-validator';

export class StudentDto {

  @IsNotEmpty({message:"Required Name"})
  @IsString()
  name: string;

  @IsNotEmpty({message:"Required Email"})
  @IsString()
  email: string;

  @IsNotEmpty({message:"Required Address"})
  @IsString()
  address: string;

  @IsNotEmpty({message:"Required Birth Date"})
  @IsString()
  birthDate: string;
}