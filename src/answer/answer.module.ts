import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AnswerRepository } from './answer.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './entities/answer.entity';
import { TestModule } from 'src/test/test.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository],
  exports: [AnswerService, AnswerRepository],
  imports: [
    MongooseModule.forFeature([{ schema: AnswerSchema, name: Answer.name }]),
    TestModule,
  ],
})
export class AnswerModule {}
