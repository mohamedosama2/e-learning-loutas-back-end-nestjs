import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { addQuestionMethod } from './addQuestion.dto';

export class AddOthersDto extends addQuestionMethod {
  @IsOptional()
  @IsString()
  answer?: string;
}
