import { Module, UseInterceptors } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PhoneConfirmationModule } from './phone-confirmation/phone-confirmation.module';
import { DatabaseModule } from './database.module';
import { ChatModule } from './chat/chat.module';
import { MembershipModule } from './membership/membership.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TestModule } from './test/test.module';
import { AnswerModule } from './answer/answer.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PhoneConfirmationModule,
    ChatModule,
    MembershipModule,
    SubscriptionModule,
    TestModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
