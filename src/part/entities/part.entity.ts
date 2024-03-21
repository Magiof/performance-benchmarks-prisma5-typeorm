import { UserPart } from 'src/user-part/entities/user-part.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserPart, (userPart) => userPart.part)
  userParts: UserPart[];
}
