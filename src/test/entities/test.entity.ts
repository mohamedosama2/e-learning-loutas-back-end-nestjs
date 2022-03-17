import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User, UserRole } from 'src/users/models/_user.model';
import { QuestionsSchema } from './questions.entity';
import { registerQuestionSchemaDiscriminator } from './register-questions-schema-discriminator';

export type TestDocument = Test & Document;

@Schema()
export class Test {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  teacher: string | User;

  @Prop({
    required: true,
    type: String,
  })
  duration: string;

  @Prop({
    type: Date,
    required: true,
  })
  startDate: Date;

  @Prop({
    required: true,
    type: [QuestionsSchema],
  })
  questions: unknown[];
}

export const TestSchema = SchemaFactory.createForClass(Test);

const questionsArraySchema = TestSchema.path(
  'questions',
) as MongooseSchema.Types.DocumentArray;

registerQuestionSchemaDiscriminator(questionsArraySchema);
