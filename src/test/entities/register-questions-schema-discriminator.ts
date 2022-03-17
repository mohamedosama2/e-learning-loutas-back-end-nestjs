import { Schema } from 'mongoose';
import { McqSchema } from './mcq.entity';
import { OthresSchema } from './others.entity';
import { KindTypes } from './questions.entity';
import { TfSchema } from './tf.entity';

export function registerQuestionSchemaDiscriminator(
  animalsArraySchema: Schema.Types.DocumentArray,
): void {
  animalsArraySchema.discriminator(KindTypes.MCQ, McqSchema);
  animalsArraySchema.discriminator(KindTypes.OTHERS, OthresSchema);
  animalsArraySchema.discriminator(KindTypes.TF, TfSchema);
}
