import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type McqDocument = Mcq & Document;

@Schema()
export class Mcq {
  @Prop({
    type: [String],
    required: true,
  })
  answers: string[];

  @Prop({
    type: String,
    required: true,
  })
  rightAsnwer: string;
}

export const McqSchema = SchemaFactory.createForClass(Mcq);
