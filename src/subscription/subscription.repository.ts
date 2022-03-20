import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AnyObject,
  FilterQuery,
  Model,
  OnlyFieldsOfType,
  Types,
  _UpdateQueryDef,
} from 'mongoose';
import { UserDocument } from 'src/users/models/_user.model';
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

  async findSubscriptions(
    filter: FilterQuery<SubscriptionDocument>,
    options: {},
  ) {
    return await this.subscriptionModel.find(filter, options);
  }

  async addSubscription(
    filter: FilterQuery<SubscriptionDocument>,
    me: UserDocument,
  ) {
    return await this.subscriptionModel.updateOne(filter, {
      $addToSet: { students: me._id } as OnlyFieldsOfType<
        _UpdateQueryDef<SubscriptionDocument>,
        any[],
        any
      > &
        AnyObject,
    });
  }

  async removeSubscription(
    filter: FilterQuery<SubscriptionDocument>,
    me: UserDocument,
  ) {
    return await this.subscriptionModel.updateOne(filter, {
      $pull: { students: me._id } as OnlyFieldsOfType<
        _UpdateQueryDef<SubscriptionDocument>,
        any[],
        any
      > &
        AnyObject,
    });
  }
}
