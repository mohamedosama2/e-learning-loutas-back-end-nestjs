import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SubscriptionType } from '../entities/subscription.entity';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsEnum(SubscriptionType)
  kind: SubscriptionType;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
