import { User } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'url_short',
})
export class Short {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url_redirect: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  short: string;

  @Column({
    default: new Date(),
  })
  date_created: Date;

  @Column({
    default: new Date(),
  })
  date_updated: Date;

  @Column({
    default: 0,
  })
  clicks: number;

  // Null if the short is public
  @ManyToOne(() => User, (user) => user.shorts, {
    eager: true,
    nullable: true,
  })
  user: User | null;

  @BeforeInsert()
  generateShort() {
    this.short = Math.random().toString(36).substring(2, 10);

    if (!this.name || this.name === '') {
      this.name = this.short;
    }
  }

  @BeforeUpdate()
  updateDate() {
    this.date_updated = new Date();
  }
}
