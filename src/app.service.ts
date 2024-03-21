import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Part } from './part/entities/part.entity';
import { UserPart } from './user-part/entities/user-part.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Part) private partRepository: Repository<Part>,
    @InjectRepository(UserPart)
    private userPartRepository: Repository<UserPart>,
  ) {}

  async createDataByPrisma() {
    const durations = [];
    for (let j = 0; j < 100; j++) {
      const now = new Date();
      for (let i = 0; i < 100; i++) {
        await this.prismaService.userPart.create({
          data: {
            user: { create: { name: 'test-prisma', password: nanoid() } },
            part: { create: { name: 'test-prisma', description: '' } },
            quantity: 0,
          },
        });
      }
      durations.push(new Date().getTime() - now.getTime());
    }
    const average = durations.reduce((a, b) => a + b) / durations.length;

    return `createDataByPrisma: ${average} ms`;
  }

  async createDataByTypeOrm() {
    const durations = [];

    for (let j = 0; j < 100; j++) {
      const now = new Date();

      for (let i = 0; i < 100; i++) {
        const newUser = this.userRepository.create({
          name: 'test-typeorm',
          password: nanoid(),
        });
        const newPart = this.partRepository.create({
          name: 'test-typeorm',
          description: '',
        });
        await Promise.all([
          this.userRepository.save(newUser),
          this.partRepository.save(newPart),
        ]);
        await this.userPartRepository.save({
          user: newUser,
          part: newPart,
          quantity: 0,
        });
      }
      durations.push(new Date().getTime() - now.getTime());
    }
    const average = durations.reduce((a, b) => a + b) / durations.length;

    return `createDataByTypeOrm: ${average} ms`;
  }

  async getUsersByPrisma() {
    const durations = [];
    for (let i = 0; i < 100; i++) {
      const now = new Date();
      await this.prismaService.user.findMany({
        include: { UserPart: { include: { part: true } } },
      });
      durations.push(new Date().getTime() - now.getTime());
    }
    const average = durations.reduce((a, b) => a + b) / durations.length;

    return `getUsersByPrisma: ${average} ms`;
  }

  async getUsersByTypeOrm() {
    const durations = [];
    for (let i = 0; i < 100; i++) {
      const now = new Date();
      await this.userRepository.find({
        relations: { userParts: { part: true } },
      });
      durations.push(new Date().getTime() - now.getTime());
    }
    const average = durations.reduce((a, b) => a + b) / durations.length;
    return `getUsersByTypeOrm: ${average} ms`;
  }

  async cleanUp() {
    await this.userPartRepository.delete({});
    await this.userRepository.delete({});
    await this.partRepository.delete({});
    return 'cleanUp';
  }
}
