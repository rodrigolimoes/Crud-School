import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as SchemaMongo} from 'mongoose';

export type SchoolClassDocument = SchoolClassModel & Document; 

@Schema()
export class SchoolClassModel {

  @Prop({type: SchemaMongo.Types.ObjectId, ref:'teacher', required: true})
  teacher: string;

  @Prop()
  students: string[];

  @Prop({required: true})
  startTime: Date;

  @Prop({required: true})
  endTime: Date;

}


export const SchoolClassSchema = SchemaFactory.createForClass(SchoolClassModel);