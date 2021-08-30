import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  getUsers() {}

  async join(email: string, nickname: string, password: string) {
    if (!email) {
      throw new HttpException('이메일 없네요', 400);
    }
    if (!nickname) {
      throw new HttpException('닉네임 없네요', 400);
    }
    if (!password) {
      throw new HttpException('비밀번호 없네요', 400);
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('이미 존재하는 사용자입니다', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
