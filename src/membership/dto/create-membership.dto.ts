import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateMembershipDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmptyObject()
  @IsObject()
  subscription: Record<string, any>;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}
