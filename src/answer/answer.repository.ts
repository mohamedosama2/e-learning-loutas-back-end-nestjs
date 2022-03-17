import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AnyObject,
  Model,
  OnlyFieldsOfType,
  Types,
  _UpdateQueryDef,
} from 'mongoose';
import { Test } from 'src/test/entities/test.entity';
import { UserDocument } from 'src/users/models/_user.model';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer, AnswerDocument } from './entities/answer.entity';
/* import { Test, TestDocument } from './entities/test.entity';
 */
@Injectable()
export class AnswerRepository extends BaseAbstractRepository<Answer> {
  constructor(
    @InjectModel(Answer.name)
    private answerModel: Model<AnswerDocument>,
  ) {
    super(answerModel);
  }
  async findTest(testId: string, me: UserDocument) {
    return await this.answerModel.aggregate([
      {
        $match: {
          student: new Types.ObjectId(me._id),
          testId: new Types.ObjectId(testId),
        },
      },
      {
        $lookup: {
          from: 'tests',
          localField: 'testId',
          foreignField: '_id',
          as: 'test',
        },
      },
      {
        $unwind: { path: '$answers', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$test', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$test.questions', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          haveAnswer: {
            $cond: {
              if: { $eq: ['$answers.qId', '$test.questions._id'] },
              then: true,
              else: false,
            },
          },
        },
      },
      { $match: { haveAnswer: true } }, ///Fetched All Answered
      { $addFields: { questions: { _id: '$answers.qId' } } },
      {
        $group: {
          _id: null,
          ids: { $push: '$answers.qId' },
          docs: { $push: '$$ROOT' },
        },
      },
      {
        $unionWith: {
          coll: 'tests',
          pipeline: [
            {
              $unwind: { path: '$questions', preserveNullAndEmptyArrays: true },
            },
            { $addFields: { haveAnswer: false } },
            {
              $group: {
                _id: null,
                docs: { $push: '$$ROOT' },
              },
            },
            { $addFields: { ids: [] } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          ids: { $first: '$ids' },
          docs: { $push: '$docs' },
        },
      },
      {
        $unwind: { path: '$docs', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$docs', preserveNullAndEmptyArrays: true },
      },

      { $addFields: { deleteIt: { $in: ['$docs.questions._id', '$ids'] } } },
      {
        $match: {
          $or: [
            { $and: [{ deleteIt: false }, { 'docs.haveAnswer': false }] },
            { $and: [{ deleteIt: true }, { 'docs.haveAnswer': true }] },
          ],
        },
      },
      {
        $project: {
          'docs.questions.rightAsnwer': 0,
          'docs.test.questions.rightAsnwer': 0,
        },
      },
    ]);
  }

  async findDgree(testId: string, me: UserDocument) {
    return await this.answerModel.aggregate([
      {
        $match: {
          student: new Types.ObjectId(me._id),
          testId: new Types.ObjectId(testId),
        },
      },
      {
        $lookup: {
          from: 'tests',
          localField: 'testId',
          foreignField: '_id',
          as: 'test',
        },
      },
      {
        $unwind: { path: '$answers', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$test', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$test.questions', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          haveAnswer: {
            $cond: {
              if: { $eq: ['$answers.qId', '$test.questions._id'] },
              then: true,
              else: false,
            },
          },
        },
      },
      { $match: { haveAnswer: true } }, ///Fetched All Answered
      { $addFields: { questions: { _id: '$answers.qId' } } },
      {
        $group: {
          _id: null,
          ids: { $push: '$answers.qId' },
          docs: { $push: '$$ROOT' },
        },
      },
      {
        $unionWith: {
          coll: 'tests',
          pipeline: [
            {
              $unwind: { path: '$questions', preserveNullAndEmptyArrays: true },
            },
            { $addFields: { haveAnswer: false } },
            {
              $group: {
                _id: null,
                docs: { $push: '$$ROOT' },
              },
            },
            { $addFields: { ids: [] } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          ids: { $first: '$ids' },
          docs: { $push: '$docs' },
        },
      },
      {
        $unwind: { path: '$docs', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$docs', preserveNullAndEmptyArrays: true },
      },

      { $addFields: { deleteIt: { $in: ['$docs.questions._id', '$ids'] } } },
      {
        $match: {
          $or: [
            { $and: [{ deleteIt: false }, { 'docs.haveAnswer': false }] },
            { $and: [{ deleteIt: true }, { 'docs.haveAnswer': true }] },
          ],
        },
      },

      {
        $addFields: {
          'docs.questions.rightAsnwer': {
            $toString: '$docs.questions.rightAsnwer',
          },
          'docs.test.questions.rightAsnwer': {
            $toString: '$docs.test.questions.rightAsnwer',
          },
        },
      },
      {
        $project: {
          _id: 0,
          ids: 0,
          'docs.student': 0,
          'docs.testId': 0,
          'docs.__v': 0,
          'docs.haveAnswer': 0,
        },
      },
      {
        $addFields: {
          getYourDegree: {
            $cond: [
              {
                $eq: [
                  '$docs.answers.myAnswer',
                  '$docs.test.questions.rightAsnwer',
                ],
              },
              '$docs.test.questions.degree',
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          fullDegree: { $sum: '$docs.test.questions.degree' },
          myDegree: { $sum: '$getYourDegree' },
          fullQuestions: { $sum: 1 },
          mistakes: {
            $sum: {
              $cond: [{ $eq: ['$getYourDegree', 0] }, 1, 0],
            },
          },
          /*   precentage: {
            $mod: [
              { $sum: '$getYourDegree' },
              { $sum: '$docs.test.questions.degree' },
            ],
          }, */
        },
      },
      { $addFields: { precentage: { $divide: ["$myDegree","$fullDegree"] } } },
    ]);
  }
}
/*      'docs.questions.rightAsnwer': 0,
     'docs.test.questions.rightAsnwer': 0, */
