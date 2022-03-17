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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorators/me.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/models/_user.model';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';
import ParamsWithId from 'src/utils/paramsWithId.dto';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer, AnswerDocument } from './entities/answer.entity';

@ApiBearerAuth()
@ApiTags('answer'.toUpperCase())
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @Roles(UserRole.STUDENT)
  async createSolution(@Query() { id: testId }: ParamsWithId, @AuthUser() me) {
    return await this.answerService.createSolution(testId, me);
  }

  @Post('/SubmitAnswer')
  @Roles(UserRole.STUDENT)
  async subimtAnswer(
    @Body() CreateAnswerDto: CreateAnswerDto,
    @AuthUser() me,
  ) /*: Promise<AnswerDocument>*/ {
    return await this.answerService.subimtAnswer(CreateAnswerDto, me);
  }

  @Get()
  @ApiPaginatedResponse(Answer)
  async findAll(@Query() PaginatedParams: PaginationParams) {
    return await this.answerService.findAll(PaginatedParams);
  }

  @Get('/FetchTest/:id')
  findTest(@Param() { id }: ParamsWithId, @AuthUser() me) {
    return this.answerService.findOne(id, me);
  }

  @Get('/fetchDegree/:id')
  async findDgree(@Param() { id }: ParamsWithId, @AuthUser() me) {
    return this.answerService.findDegree(id, me);
  }

  @Patch(':id')
  update(
    @Param() { id }: ParamsWithId,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answerService.update({ _id: id }, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
