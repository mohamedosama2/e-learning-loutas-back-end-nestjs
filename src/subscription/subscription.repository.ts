import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import {
  Subscription,
  SubscriptionDocument,
} from './entities/subscription.entity';

@Injectable()
export class SubscriptionRepository extends BaseAbstractRepository<Subscription> {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {
    super(subscriptionModel);
  }
}
