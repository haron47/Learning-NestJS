import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptors';
import { Users } from 'src/entities/Users';
import { JoinRequestDto } from './dto/join.request.dto';
import { ApiDocs } from './users.docs';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiDocs.getUsers('특정 사용자 조회')
  @Get()
  getUsers(@User() user: JoinRequestDto) {
    return user || false;
  }

  @ApiDocs.findByEmail('이메일로 정보조회')
  @Get(':email')
  async findByEmail(@Param() email: string) {
    await this.usersService.findByEmail(email);
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiDocs.join('회원가입')
  @Post()
  async join(@Body() data: JoinRequestDto) {
    await this.usersService.join(data.email, data.nickname, data.password);
  }

  @ApiDocs.logIn('로그인')
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  logIn(@User() user: Users) {
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiDocs.logOut('로그아웃')
  @Post('logout')
  logOut(@User() user, @Res() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
