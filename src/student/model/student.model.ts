import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type StudentDocument = StudentModel & Document;

@Schema()
export class StudentModel {
  
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  address: string;

  @Prop({required: true})
  birthDate: Date;
}

export const StudentSchema = SchemaFactory.createForClass(StudentModel);