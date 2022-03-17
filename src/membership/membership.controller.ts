import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserDocument, UserRole } from 'src/users/models/_user.model';
import { Membership, MembershipDocument } from './entities/membership.entity';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { FilterQuery, PaginateResult } from 'mongoose';
import ParamsWithId from 'src/utils/paramsWithId.dto';

@ApiBearerAuth()
@ApiTags('membership'.toUpperCase())
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  async create(
    @Body() createMembershipDto: CreateMembershipDto,
  ): Promise<MembershipDocument> {
    return await this.membershipService.create(createMembershipDto);
  }

  @Get()
  @Roles(UserRole.STUDENT)
  @ApiPaginatedResponse(Membership)
  async findAll(
    @Query() FilterQuerySubscriptions: PaginationParams,
  ): Promise<PaginateResult<MembershipDocument> | MembershipDocument[]> {
    return await this.membershipService.findAll(FilterQuerySubscriptions);
  }

  @Get(':id')
  async findOne(@Param() { id }: ParamsWithId): Promise<MembershipDocument> {
    return await this.membershipService.findOne({ _id: id });
  }

  @Patch(':id')
  async update(
    @Param() { id }: ParamsWithId,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return await this.membershipService.update(
      { _id: id } as FilterQuery<MembershipDocument>,
      updateMembershipDto,
    );
  }

  @Delete(':id')
  async remove(@Param() { id }: ParamsWithId) {
    return await this.membershipService.remove({ _id: id });
  }
}
