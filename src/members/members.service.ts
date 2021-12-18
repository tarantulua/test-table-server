import { Injectable } from '@nestjs/common';
import { GetMemberDto } from './dto/GetMemberDto';
import * as TEMP_MOCKED_MEMBERS from '../data/members.json';
import { CreateMemberDto } from './dto/CreateMemberDto';

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

  getAllMembers = (): GetMemberDto[] => {
    return MOCKED_MEMBERS;
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
