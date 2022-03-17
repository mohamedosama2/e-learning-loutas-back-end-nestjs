import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './entities/test.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Test.name,
        schema: TestSchema,
      },
    ]),
  ],
  controllers: [TestController],
  providers: [TestService, TestRepository],
  exports: [TestService, TestRepository],
})
export class TestModule {}
