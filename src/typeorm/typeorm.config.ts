import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'src/prisma/dev.db',
  entities: [__dirname + '../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
};
