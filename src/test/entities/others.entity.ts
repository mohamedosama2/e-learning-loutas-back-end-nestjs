import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OthersDocument = Others & Document;

@Schema()
export class Others {
  @Prop({ type: String })
  answer?: string;
}

export const OthresSchema = SchemaFactory.createForClass(Others);
