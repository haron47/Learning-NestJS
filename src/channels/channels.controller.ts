import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post()
  createChannel() {}

  @Get(':name')
  getSpecificChannel(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Get(':name/chats')
  getChats(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post(':name/chats')
  postChats(@Body() body) {}

  @Get(':name/members')
  getAllMembers(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
  }

  @Post(':name/members')
  inviteMembers(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
  }
}
