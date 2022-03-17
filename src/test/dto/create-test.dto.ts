import { Type } from 'class-transformer';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from 'src/users/customValidationDecorator';
import { UserRole } from 'src/users/models/_user.model';
import { KindTypes } from '../entities/questions.entity';
import { AddMcqDto } from './addMcq.dto';
import { AddOthersDto } from './addOthers.dto';
import { addQuestionMethod } from './addQuestion.dto';
import { AddTfDto } from './addTf.dto';

export class CreateTestDto {
  @IsMongoId()
  @IsNotEmpty()
  teacher: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => addQuestionMethod, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'kind',
      subTypes: [
        { value: AddTfDto, name: KindTypes.TF },
        { value: AddOthersDto, name: KindTypes.OTHERS },
        { value: AddMcqDto, name: KindTypes.MCQ },
      ],
    },
  })
  questions: (AddOthersDto | AddMcqDto | AddTfDto)[];
}
