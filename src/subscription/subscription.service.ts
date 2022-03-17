import { Injectable } from '@nestjs/common';
import { CreateQuery, FilterQuery, PaginateResult } from 'mongoose';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import ParamsWithId from 'src/utils/paramsWithId.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { SubscriptionDocument } from './entities/subscription.entity';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly SubscriptionRepository: SubscriptionRepository,
  ) {}
  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    const doc = await this.SubscriptionRepository.create(createSubscriptionDto);
    return doc;
  }

  async findAll(
    FilterQuerySubscriptions: PaginationParams,
  ): Promise<PaginateResult<SubscriptionDocument> | SubscriptionDocument[]> {
    return await this.SubscriptionRepository.findAllWithPaginationOption(
      FilterQuerySubscriptions,
      [],
    );
  }

  async findOne(
    filter: FilterQuery<SubscriptionDocument>,
  ): Promise<SubscriptionDocument> {
    return await this.SubscriptionRepository.findOne(filter);
  }

  async update(
    filter: FilterQuery<SubscriptionDocument>,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.SubscriptionRepository.updateOne(
      filter,
      updateSubscriptionDto,
    );
  }

  async remove(filter: FilterQuery<SubscriptionDocument>) {
    return this.SubscriptionRepository.deleteOne(filter);
  }
}
