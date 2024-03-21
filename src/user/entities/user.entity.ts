import { UserPart } from 'src/user-part/entities/user-part.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => UserPart, (userPart) => userPart.user)
  userParts: UserPart[];
}
