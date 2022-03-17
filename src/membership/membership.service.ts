import { Injectable } from '@nestjs/common';
import {
  CreateQuery,
  FilterQuery,
  PaginateResult,
  UpdateQuery,
} from 'mongoose';
import { UserDocument } from 'src/users/models/_user.model';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipDocument } from './entities/membership.entity';
import { MembershipRepository } from './membership.repository';

@Injectable()
export class MembershipService {
  constructor(private readonly membershipRepositary: MembershipRepository) {}

  async create(
    filter: CreateQuery<MembershipDocument>,
  ): Promise<MembershipDocument> {
    return await this.membershipRepositary.create(filter);
  }

  async findAll(
    filter: PaginationParams,
  ): Promise<PaginateResult<MembershipDocument> | MembershipDocument[]> {
    return await this.membershipRepositary.findAllWithPaginationOption(
      filter,
      [],
    );
  }

  async findOne(
    filter: FilterQuery<MembershipDocument>,
  ): Promise<MembershipDocument> {
    return await this.membershipRepositary.findOne(filter);
  }

  async update(
    filter: FilterQuery<MembershipDocument>,
    updateMembershipDto: UpdateMembershipDto,
  ): Promise<UpdateQuery<MembershipDocument>> {
    return await this.membershipRepositary.updateOne(
      filter,
      updateMembershipDto,
    );
  }

  async remove(filter: FilterQuery<MembershipDocument>) {
    return await this.membershipRepositary.deleteOne(filter);
  }
}
