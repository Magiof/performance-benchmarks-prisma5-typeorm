import { Part } from 'src/part/entities/part.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('UserPart')
export class UserPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  userId: number;

  @Column()
  partId: number;

  @ManyToOne(() => User, (user) => user.userParts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Part, (part) => part.userParts)
  @JoinColumn({ name: 'partId' })
  part: Part;
}
