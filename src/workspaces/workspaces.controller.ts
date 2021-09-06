import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get('')
  getMyWorkspaces(@Param('myId', ParseIntPipe) myId: number) {
    return this.workspacesService.findMyWorkspaces(myId);
  }

  @Post()
  createWorkspaces() {}

  @Get('/:url/members')
  getAllMembersFromWorkspace() {}

  @Post('/:url/members')
  inviteMembersToWorkspace() {}

  @Delete('/:url/members/:id')
  kickMemberFromWorkspace() {}

  @Get('/:url/members/:id')
  getMemberInfoInWorkspace() {}

  @Get('/:url/users/:id')
  DEPRECATED_getMemberInfoInWorkspace() {
    this.getMemberInfoInWorkspace();
  }
}
