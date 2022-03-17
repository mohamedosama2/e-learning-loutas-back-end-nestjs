import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

export enum SubscriptionType {
  NORMAL = 'NORMAL',
  PREMIUM = 'PREMIUM',
  ADVANCED = 'ADVANCED',
}

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) => {
      delete doc.__v;
      return doc;
    },
  },
})
export class Subscription {
  @Prop({ type: String, required: true })
  duration: string;

  @Prop({ type: String, enum: Object.values(SubscriptionType) })
  kind: SubscriptionType;

  @Prop({ type: Number, required: true })
  price: number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
