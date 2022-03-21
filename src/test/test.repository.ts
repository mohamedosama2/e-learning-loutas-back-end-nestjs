import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/models/_user.model';
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
  async fetchAllTestsGroupedbyTeacher(me: UserDocument) {
    const testsGrouped = await this.testModel.aggregate([
      {
        $project: {
          'questions.degree': 1,
          startDate: 1,
          _id: 1,
          duration: 1,
          teacher: 1,
        },
      },
      { $group: { _id: '$teacher', test: { $push: '$$ROOT' } } },
      {
        $unwind: { path: '$test', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          teacher: { $toObjectId: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'teacher',
          foreignField: '_id',
          as: 'techerInfo',
        },
      },
      { $addFields: { degreesValues: '$test.questions.degree' } },
      { $addFields: { degreeOfTheTest: { $sum: '$degreesValues' } } },
      {
        $project: {
          _id: 0,
          'techerInfo.enabled': 0,
          'techerInfo.password': 0,
          'techerInfo.createdAt': 0,
          'techerInfo.updatedAt': 0,
          'techerInfo.__v': 0,
          'test.teacher': 0,
          degreesValues: 0,
          'test.questions': 0,
        },
      },
    ]);
    return testsGrouped;
  }
  async fetchTest(me: UserDocument, testId: string) {
    const testsGrouped = await this.testModel.aggregate([
      { $match: { _id: new Types.ObjectId(testId) } },
      {
        $project: {
          'questions.degree': 1,
          startDate: 1,
          _id: 1,
          duration: 1,
          teacher: 1,
        },
      },
      { $group: { _id: '$teacher', test: { $push: '$$ROOT' } } },
      {
        $unwind: { path: '$test', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          teacher: { $toObjectId: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'teacher',
          foreignField: '_id',
          as: 'techerInfo',
        },
      },
      { $addFields: { degreesValues: '$test.questions.degree' } },
      { $addFields: { degreeOfTheTest: { $sum: '$degreesValues' } } },
      {
        $project: {
          _id: 0,
          'techerInfo.enabled': 0,
          'techerInfo.password': 0,
          'techerInfo.createdAt': 0,
          'techerInfo.updatedAt': 0,
          'techerInfo.__v': 0,
          'test.teacher': 0,
          degreesValues: 0,
          'test.questions': 0,
        },
      },
    ]);
    return testsGrouped[0];
  }
}
