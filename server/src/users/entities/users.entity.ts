import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @Column({ type: 'varchar', length: 250, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100,
  })
  email: string;

  @Column({ length: 250, nullable: true })
  phone: string;

  @Exclude({ toPlainOnly: true })
  @Column({ length: 100, nullable: true })
  password: string;

  @Column({ length: 500, nullable: true })
  googleId: string;
}
