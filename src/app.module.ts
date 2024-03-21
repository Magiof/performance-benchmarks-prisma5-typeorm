import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './typeorm/typeorm.config';
import { UserModule } from './user/user.module';
import { UserPartModule } from './user-part/user-part.module';
import { PartModule } from './part/part.module';
import { User } from './user/entities/user.entity';
import { Part } from './part/entities/part.entity';
import { UserPart } from './user-part/entities/user-part.entity';

@Module({
  imports: [
    PrismaModule,
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, Part, UserPart]),
    UserModule,
    UserPartModule,
    PartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
