import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {
  AnyObject,
  FilterQuery,
  OnlyFieldsOfType,
  PaginateResult,
  Types,
  _UpdateQueryDef,
} from 'mongoose';
import { TestDocument } from 'src/test/entities/test.entity';
import { TestService } from 'src/test/test.service';
import { UserDocument } from 'src/users/models/_user.model';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { AnswerRepository } from './answer.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerDocument } from './entities/answer.entity';

export interface CreateNewSoultion {
  exists: AnswerDocument;
  new: boolean;
  Test: TestDocument;
}

@Injectable()
export class AnswerService {
  constructor(
    private readonly AnswerRepository: AnswerRepository,
    private readonly TestService: TestService,
  ) {}

  async createSolution(
    testId: string,
    me: UserDocument,
    qid?: string,
  ): Promise<CreateNewSoultion> {
    const testObjectId = new Types.ObjectId(testId);
    const Test = await this.TestService.findOne(
      qid
        ? { _id: testId, 'questions._id': new Types.ObjectId(qid) }
        : { _id: testId },
      qid
        ? {
            projection: {
              startDate: 1,
              duration: 1,
              'questions.$': 1,
            },
          }
        : {},
    );
    /*    console.log(Test); */
    const isBetweenTestTime = moment().isBetween(
      moment(new Date(Test.startDate)),
      moment(new Date(Test.startDate)).add(parseInt(Test.duration), 'minutes'),
    );

    console.log(isBetweenTestTime);

    if (!isBetweenTestTime) throw new BadRequestException();
    const exists = await this.AnswerRepository.findOne(
      {
        student: me._id,
        testId: testObjectId,
      },
      qid
        ? {
            projection: {
              answers: {
                $elemMatch: { qId: { $eq: new Types.ObjectId(qid) } },
              },
            },
          }
        : {},
    );
    if (exists) return { exists, new: false, Test };

    return {
      exists: await this.AnswerRepository.create({
        student: me._id,
        testId: testObjectId,
        answers: [],
      }),
      new: true,
      Test,
    };
  }

  async subimtAnswer(createAnswerDto: CreateAnswerDto, me: UserDocument) {
    const {
      exists,
      new: newRcord,
      Test,
    } = await this.createSolution(
      createAnswerDto.testId as string,
      me,
      createAnswerDto.answer.qId as string,
    );

    createAnswerDto.answer.rightAnswer = Test.questions[0]['rightAnswer'];
    if (newRcord || exists.answers.length === 0) {
      return await this.AnswerRepository.findOneAndUpdate(
        { student: me._id, testId: new Types.ObjectId(createAnswerDto.testId) },
        {
          $push: { answers: createAnswerDto.answer } as OnlyFieldsOfType<
            _UpdateQueryDef<AnswerDocument>,
            readonly any[],
            any
          > &
            AnyObject,
        },
        { projection: { testId: 1 } },
      );
    }
    return await this.AnswerRepository.findOneAndUpdate(
      {
        student: me._id,
        testId: new Types.ObjectId(createAnswerDto.testId),
        'answers.qId': new Types.ObjectId(createAnswerDto.answer.qId as string),
      },
      {
        $set: {
          'answers.$[el]': createAnswerDto.answer,
        },
      },
      {
        projection: { testId: 1 },
        arrayFilters: [
          {
            'el.qId': {
              $eq: new Types.ObjectId(createAnswerDto.answer.qId as string),
            },
          },
        ],
      },
    );
  }

  /*  async create(createAnswerDto: CreateAnswerDto) {
    await this.AnswerRepository.addAnswer(createAnswerDto);
  } */

  async findDegree(testId: string, me: UserDocument) {
    const test = await this.TestService.findOne(
      { _id: testId },
      { projection: { questions: 0 } },
    );
    console.log(test);

    const isAfterTestTime = moment().isAfter(
      moment(new Date(test.startDate)).add(parseInt(test.duration), 'minutes'),
    );
    console.log(isAfterTestTime);
    console.log(moment());
    console.log(moment(new Date(test.startDate)));

    if (!isAfterTestTime)
      throw new BadRequestException('you cant fetch degree now');
    return await this.AnswerRepository.findDgree(testId, me);
  }

  async findAll(
    filter: PaginationParams,
  ): Promise<PaginateResult<AnswerDocument> | AnswerDocument[]> {
    return await this.AnswerRepository.findAllWithPaginationOption(filter, []);
  }

  async findOne(testId: string, me: UserDocument) {
    const Test = await this.TestService.findOne({ _id: testId });
    const isBetweenTestTime = moment().isBetween(
      moment(new Date(Test.startDate)),
      moment(new Date(Test.startDate)).add(parseInt(Test.duration), 'minutes'),
    );

    if (!isBetweenTestTime) throw new BadRequestException();
    return await this.AnswerRepository.findTest(testId, me);
  }

  update(
    filter: FilterQuery<AnswerDocument>,
    updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.AnswerRepository.updateOne(filter, updateAnswerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
