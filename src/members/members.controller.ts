import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IFilters } from 'src/types/filters';
import { queryToFilters } from 'src/utils/filters';
import { CreateMemberDto } from './dto/CreateMemberDto';
import { GetMemberDto } from './dto/GetMemberDto';
import { GetMembersDto } from './dto/GetMembersDto';
import { MembersService } from './members.service';

@Controller('api/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get(':id')
  getMemberById(@Param('id') id: string): GetMemberDto {
    const result: GetMemberDto | undefined =
      this.membersService.getMemberById(id);
    if (!result) {
      throw new HttpException(
        `There is no member with id = ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  @Get()
  getAllMembers(@Query() query: IFilters): GetMembersDto {
    return this.membersService.getAllMembers(query);
  }

  @Post()
  @Header('Cache-Control', 'none')
  @Header('Content-Type', 'application/json')
  createMember(@Body() createMemberDto: CreateMemberDto): CreateMemberDto {
    return createMemberDto;
  }
}
