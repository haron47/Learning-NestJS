import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Channels } from '../../entities/Channels';
import { Workspaces } from '../../entities/Workspaces';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Workspaces)
      .values([{ id: 2, name: 'Sleact2', url: 'sleact2' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Channels)
      .values([{ id: 2, name: '일반2', WorkspaceId: 2, private: false }])
      .execute();
  }
}
