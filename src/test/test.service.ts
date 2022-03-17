import { Injectable } from '@nestjs/common';
import { FilterQuery, PaginateResult, QueryOptions } from 'mongoose';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestDocument } from './entities/test.entity';
import { TestRepository } from './test.repository';

@Injectable()
export class TestService {
  constructor(private readonly TestRepository: TestRepository) {}
  async create(createTestDto: CreateTestDto) {
    return await this.TestRepository.create(createTestDto);
  }

  async findAll(
    filter: PaginationParams,
  ): Promise<PaginateResult<TestDocument> | TestDocument[]> {
    return await this.TestRepository.findAllWithPaginationOption(filter, [], {
      populate: 'teacher',
      projection: { questions: 0 },
    });
  }

  async findOne(filter: FilterQuery<TestDocument>, options: QueryOptions = {}) {
    return await this.TestRepository.findOne(filter, options);
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
