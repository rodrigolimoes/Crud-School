import {IsString, IsNotEmpty} from 'class-validator';

export class TimeClassDto {
  
  @IsNotEmpty({message: "Required Start Time"})
  @IsString()
  startTime: string;

  @IsNotEmpty({message: "Required End Time"})
  @IsString()
  endTime: string;
}