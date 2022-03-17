import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class addQuestionMethod {
  @IsString()
  @IsNotEmpty()
  kind: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNumber()
  @IsNotEmpty()
  degree: number;
}
