import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type TeacherDocument = TeacherModel & Document;

@Schema()
export class TeacherModel {

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  address: string;

  @Prop({required: true})
  birthDate: Date;

  @Prop({required: true})
  subject: string;
}

export const TeacherSchema = SchemaFactory.createForClass(TeacherModel);