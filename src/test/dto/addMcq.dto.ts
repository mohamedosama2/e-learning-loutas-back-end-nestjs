import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { addQuestionMethod } from './addQuestion.dto';

export class AddMcqDto extends addQuestionMethod {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  answers: string[];

  @IsString()
  @IsNotEmpty()
  rightAsnwer: string;
}
