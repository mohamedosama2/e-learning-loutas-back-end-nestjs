import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Questions } from 'src/test/entities/questions.entity';
import { Test } from 'src/test/entities/test.entity';
import { User, UserRole } from 'src/users/models/_user.model';

export type AnswerDocument = Answer & Document;

export interface AnswerType {
  myAnswer: string | boolean;
  rightAnswer?: string | boolean;
  question?: string;
  qId: Questions | string;
}

@Schema()
export class Answer {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  student: User | string;

  @Prop({ type: Types.ObjectId, required: true, ref: Test.name })
  testId: Test | string | Types.ObjectId;

  /* 
  @Prop() */

  @Prop({
    type: [
      {
        myAnswer: {
          type: {},
          required: true,
        },
        rightAnswer: {},
        question: String,
        qId: {
          type: Types.ObjectId,
          required: true,
          ref: Test.name + '.' + 'questions',
        },
      },
    ],
    default: [],
    _id: false,
  })
  answers: AnswerType[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
