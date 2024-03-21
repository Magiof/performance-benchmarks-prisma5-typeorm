import { Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('prisma')
  createDataByPrisma() {
    return this.appService.createDataByPrisma();
  }

  @Post('type-orm')
  createDataByTypeOrm() {
    return this.appService.createDataByTypeOrm();
  }

  @Get('prisma')
  getUsersByPrisma() {
    return this.appService.getUsersByPrisma();
  }

  @Get('type-orm')
  getUsersByTypeOrm() {
    return this.appService.getUsersByTypeOrm();
  }

  @Delete('clean-up')
  cleanUp() {
    return this.appService.cleanUp();
  }

  @Get('test')
  async test() {
    const createDataByPrisma = await this.appService.createDataByPrisma();
    const createDataByTypeOrm = await this.appService.createDataByTypeOrm();
    const getUsersByPrisma = await this.appService.getUsersByPrisma();
    const getUsersByTypeOrm = await this.appService.getUsersByTypeOrm();
    await this.appService.cleanUp();

    return [
      createDataByPrisma,
      createDataByTypeOrm,
      getUsersByPrisma,
      getUsersByTypeOrm,
    ].join('\n');
  }
}
