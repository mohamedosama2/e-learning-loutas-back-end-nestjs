import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionSchema,
} from './entities/subscription.entity';
import { SubscriptionRepository } from './subscription.repository';

@Module({
  controllers: [SubscriptionController],
  imports: [
    MongooseModule.forFeature([
      { schema: SubscriptionSchema, name: Subscription.name },
    ]),
  ],
  providers: [SubscriptionService, SubscriptionRepository],
  exports: [SubscriptionService, SubscriptionRepository],
})
export class SubscriptionModule {}
