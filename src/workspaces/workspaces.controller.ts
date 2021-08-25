import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getWorkspaces() {}

  @Post()
  createWorkspaces() {}
}
