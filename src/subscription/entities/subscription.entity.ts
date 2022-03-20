import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/models/_user.model';

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

  @Prop({ type: String, required: true })
  kind: string;

  @Prop({ type: String, required: true })
  info: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'users',
      },
    ],
  })
  students?: User | Types.ObjectId[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
