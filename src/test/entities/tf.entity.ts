import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TfDocument = Tf & Document;

@Schema()
export class Tf {
  @Prop({
    type: [Boolean],
    required: true,
  })
  answers: boolean[];

  @Prop({
    type: Boolean,
    required: true,
  })
  rightAsnwer: boolean;
}

export const TfSchema = SchemaFactory.createForClass(Tf);
