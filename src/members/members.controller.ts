import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/CreateMemberDto';
import { GetMemberDto } from './dto/GetMemberDto';
import { MembersService } from './members.service';

@Controller('members')
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
  getAllMembers(): GetMemberDto[] {
    return this.membersService.getAllMembers() || [];
  }

  @Post()
  @Header('Cache-Control', 'none')
  @Header('Content-Type', 'application/json')
  createMember(@Body() createMemberDto: CreateMemberDto): CreateMemberDto {
    return createMemberDto;
  }
}
