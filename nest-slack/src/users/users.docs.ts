import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto';
import { UsersController } from './users.controller';

type SwaggerMethodDoc<T> = {
  [K in keyof T]: (description: string) => MethodDecorator;
};

export const ApiDocs: SwaggerMethodDoc<UsersController> = {
  getUsers(summary: string) {
    return applyDecorators(
      ApiResponse({
        type: UserDto,
      }),
      ApiOperation({
        summary,
        description: '특정 id에 해당하는 사용자만 조회합니다.',
      }),
    );
  },
  findByEmail(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        /** '모든 사용자 조회' */
        description: '특정 이메일에 해당하는 사용자만 조회합니다.',
      }),
    );
  },
  join(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '새로운 사용자를 생성합니다.',
      }),
    );
  },
  logIn(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
      }),
      ApiResponse({
        status: 200,
        description: '성공',
        type: UserDto,
      }),
      ApiResponse({ status: 500, description: '실패', type: UserDto }),
    );
  },
  logOut(summary: string) {
    return applyDecorators(
      ApiResponse({ status: 403, description: 'Forbidden.' }),
      ApiOperation({
        summary,
      }),
    );
  },
};
