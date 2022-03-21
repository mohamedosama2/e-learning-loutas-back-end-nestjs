import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Questions } from 'src/test/entities/questions.entity';

export class AnswerTypeDto {
  /*   @IsStringOrBoolean() */
  @IsNotEmpty()
  myAnswer: string | boolean;

  /*   @IsStringOrBoolean() */
  @IsOptional()
  rightAnswer?: string | boolean;

  @IsString()
  @IsOptional()
  question?: string;

  @IsMongoId()
  @IsNotEmpty()
  qId: Questions | string;
}
