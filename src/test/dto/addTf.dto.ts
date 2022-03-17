import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { addQuestionMethod } from './addQuestion.dto';

export class AddTfDto extends addQuestionMethod {
  @IsArray()
  @IsBoolean({ each: true })
  answers: boolean[];

  @IsString()
  @IsNotEmpty()
  rightAsnwer: string;
}
