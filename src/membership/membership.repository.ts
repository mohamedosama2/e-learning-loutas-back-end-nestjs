import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Membership, MembershipDocument } from './entities/membership.entity';

@Injectable()
export class MembershipRepository extends BaseAbstractRepository<Membership> {
  constructor(
    @InjectModel(Membership.name)
    private membershipModel: Model<MembershipDocument>,
  ) {
    super(membershipModel);
  }
}
