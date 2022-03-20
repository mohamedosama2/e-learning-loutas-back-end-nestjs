import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SubscriptionType } from '../entities/subscription.entity';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  kind: string;

  @IsString()
  info: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
