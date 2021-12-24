import { IFilters } from '../../types/filters';
import { GetMemberDto } from './GetMemberDto';

export class GetMembersDto {
  data: GetMemberDto[];
  filters: IFilters;
}
