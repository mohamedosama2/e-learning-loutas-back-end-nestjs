import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Membership, MembershipSchema } from './entities/membership.entity';
import { MembershipRepository } from './membership.repository';

@Module({
  controllers: [MembershipController],
  exports: [MembershipService, MembershipRepository],
  providers: [MembershipService, MembershipRepository],
  imports: [
    MongooseModule.forFeature([
      { schema: MembershipSchema, name: Membership.name },
    ]),
  ],
})
export class MembershipModule {}
