import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MembershipDocument = Membership & Document;

@Schema()
export class Membership {
/*   id: string; */

  @Prop({ type: Types.ObjectId, required: true })
  user: string;

  @Prop(
    raw({
      subId: { type: Types.ObjectId },
      kind: { type: String },
    }),
  )
  subscription: Record<string, any>;

  @Prop(Date)
  endDate: Date;
}
export const MembershipSchema = SchemaFactory.createForClass(Membership);
