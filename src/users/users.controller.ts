import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guards';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptors';
import { Users } from 'src/entities/Users';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '정보조회' })
  @Get()
  getUsers(@User() user: JoinRequestDto) {
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    await this.usersService.join(data.email, data.nickname, data.password);
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: '실패',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(new LocalAuthGuard())
  @Post('login')
  logIn(@User() user: Users) {
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@User() user, @Res() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
