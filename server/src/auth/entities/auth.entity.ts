import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  acces_token: string;

  @ManyToOne(() => User, (user) => user.accessTokens)
  @JoinColumn({ name: 'username' })
  user: User;

  @Column()
  username: string;
}
