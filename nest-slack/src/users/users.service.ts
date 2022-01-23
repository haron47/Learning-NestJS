import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository, Transaction, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
  ) {}

  getUsers() {}

  async join(email: string, nickname: string, password: string) {
    let isSuccess = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const returned = await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.workspaceMembersRepository.save({
      UserId: returned.id,
      WorkspaceId: 1,
    });
    await this.channelMembersRepository.save({
      UserId: returned.id,
      ChannelId: 1,
    });
      } catch (err) {
          console.log(err);
          await queryRunner.rollbackTransaction();
          isSuccess = false;
      } finally {
          await queryRunner.release();
          return isSuccess;
        }
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
}
