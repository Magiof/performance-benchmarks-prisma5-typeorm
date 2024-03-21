import { Module } from '@nestjs/common';
import { UserPartService } from './user-part.service';
import { UserPartController } from './user-part.controller';

@Module({
  controllers: [UserPartController],
  providers: [UserPartService],
})
export class UserPartModule {}
