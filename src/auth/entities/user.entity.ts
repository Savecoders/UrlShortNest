import { Short } from 'src/shorts/entities/short.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  name: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  // One user can have many shorts
  @OneToMany(() => Short, (short) => short.user)
  shorts: Short;

  @BeforeInsert()
  checkFieldsInsert() {
    this.email = this.email.toLowerCase().trim();
  }
}
