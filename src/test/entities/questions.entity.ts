import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum KindTypes {
  MCQ = 'MCQ',
  TF = 'TF',
  OTHERS = 'OTHERS',
}

@Schema({ discriminatorKey: 'kind' })
export class Questions {
  @Prop({ required: true, type: String, enum: Object.values(KindTypes) })
  kind: KindTypes;

  @Prop({
    required: true,
    type: String,
  })
  question: string;

  @Prop({ required: true, type: Number })
  degree: number;
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
