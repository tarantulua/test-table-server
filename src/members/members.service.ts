import { Injectable } from '@nestjs/common';
import { GetMemberDto } from './dto/GetMemberDto';
import * as TEMP_MOCKED_MEMBERS from '../data/members.json';
import { CreateMemberDto } from './dto/CreateMemberDto';
import { GetMembersDto } from './dto/GetMembersDto';
import { IFilters } from 'src/types/filters';

const MOCKED_MEMBERS = TEMP_MOCKED_MEMBERS.map(
  (temp: any, index: number): GetMemberDto => ({
    ...temp,
    id: index.toString(),
  }),
);

@Injectable()
export class MembersService {
  getMemberById = (id: string): GetMemberDto => {
    return MOCKED_MEMBERS.find((member: GetMemberDto) => member.id === id);
  };

  getAllMembers = (filters: IFilters): GetMembersDto => {
    const result = {
      data: MOCKED_MEMBERS.slice(filters.skip, filters.skip + filters.limit),
      filters: {
        count: MOCKED_MEMBERS.length,
      },
    };
    return result;
  };

  createMember = (createMemberDto: CreateMemberDto): GetMemberDto => {
    const newMember: GetMemberDto = {
      ...createMemberDto,
      id: MOCKED_MEMBERS.length.toString(),
    };

    MOCKED_MEMBERS.push(newMember);
    return newMember;
  };
}
