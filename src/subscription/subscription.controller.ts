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
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import {
  Subscription,
  SubscriptionDocument,
  SubscriptionType,
} from './entities/subscription.entity';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { CreateQuery, PaginateResult } from 'mongoose';
import ParamsWithId from 'src/utils/paramsWithId.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserDocument, UserRole } from 'src/users/models/_user.model';
import { AuthUser } from 'src/auth/decorators/me.decorator';

@ApiTags('subscription'.toUpperCase())
@ApiBearerAuth()
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @Public()
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionDocument> {
    return await this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  @Public()
  @ApiPaginatedResponse(Subscription)
  async findAll(
    @Query() FilterQuerySubscriptions: PaginationParams,
  ): Promise<PaginateResult<SubscriptionDocument> | SubscriptionDocument[]> {
    return await this.subscriptionService.findAll(FilterQuerySubscriptions);
  }

  @Roles(UserRole.STUDENT)
  @Get('/mySubscriptopns')
  async mySubscriptopns(@AuthUser() me: UserDocument) {
    return await this.subscriptionService.fetchSubsciptions(
      { students: me._id },
      {},
    );
  }

  @Roles(UserRole.STUDENT)
  @Get('/otherSubscriptopns')
  async otherSubscriptopns(@AuthUser() me: UserDocument) {
    return await this.subscriptionService.fetchSubsciptions(
      { students: { $ne: me._id } },
      {},
    );
  }

  @Roles(UserRole.STUDENT)
  @Post('/addSubscribtion/:id')
  async addSubscibe(
    @Param() { id }: ParamsWithId,
    @AuthUser() me: UserDocument,
  ) {
    return await this.subscriptionService.addSubscibe({ _id: id }, me);
  }

  @Roles(UserRole.STUDENT)
  @Post('/removeSubscribtion/:id')
  async removeSubscibe(
    @Param() { id }: ParamsWithId,
    @AuthUser() me: UserDocument,
  ) {
    return await this.subscriptionService.removeSubscibe({ _id: id }, me);
  }

  @Get(':id')
  @Public()
  async findOne(@Param() { id }: ParamsWithId) {
    return await this.subscriptionService.findOne({ _id: id });
  }

  @Patch(':id')
  async update(
    @Param() { id }: ParamsWithId,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionService.update(
      { _id: id },
      updateSubscriptionDto,
    );
  }

  @Delete(':id')
  remove(@Param() { id }: ParamsWithId) {
    return this.subscriptionService.remove({ _id: id });
  }
}
