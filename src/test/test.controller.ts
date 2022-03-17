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
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/models/_user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Test, TestDocument } from './entities/test.entity';
import { ApiPaginatedResponse } from 'src/utils/pagination/apiPaginatedResponse';
import { PaginationParams } from 'src/utils/pagination/paginationParams.dto';

@ApiTags('test'.toUpperCase())
@ApiBearerAuth()
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @Roles(UserRole.TEACHER)
  async create(@Body() createTestDto: CreateTestDto): Promise<TestDocument> {
    return await this.testService.create(createTestDto);
  }

  @Get()
  @ApiPaginatedResponse(Test)
  async findAll(@Query() paginatedParams: PaginationParams) {
    return await this.testService.findAll(paginatedParams);
  }

 /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
