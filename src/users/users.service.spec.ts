import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';
import { getRepository } from 'typeorm';
import { UsersService } from './users.service';

class MockUserRepository {
  #data = [{ id: 1, email: 'ho@n.com' }];
  findOne({ where: { email } }) {
    const data = this.#data.find((v) => v.email === email);
    if (data) {
      return data;
    }
    return null;
  }
}
class MockworkspaceMembersRepository {}
class MockchannelMembersRepository {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockworkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockchannelMembersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByEmail은 이메일을 통해 유저를 찾아야 함', () => {
    expect(service.findByEmail('ho@n.com')).resolves.toStrictEqual({
      email: 'ho@n.com',
      id: 1,
    });
  });

  it('findByEmail은 이메일을 통해 유저를 찾아야 함', () => {
    expect(service.findByEmail('ho@.com')).resolves.toStrictEqual(null);
  });
});
