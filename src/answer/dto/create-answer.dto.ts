import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { AnswerType } from '../entities/answer.entity';
import { AnswerTypeDto } from './answer-type.dto';

export class CreateAnswerDto {
  /*   @IsMongoId()
  @IsNotEmpty()
  student: string; */

  @IsMongoId()
  @IsNotEmpty()
  testId: string | Types.ObjectId;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AnswerTypeDto)
  answer: AnswerType;
}
