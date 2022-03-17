import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { Test, TestDocument } from './entities/test.entity';

@Injectable()
export class TestRepository extends BaseAbstractRepository<Test> {
  constructor(
    @InjectModel(Test.name)
    private testModel: Model<TestDocument>,
  ) {
    super(testModel);
  }
}
