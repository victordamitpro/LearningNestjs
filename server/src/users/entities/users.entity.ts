import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  firstname: string;

  @Column({ length: 250 })
  lastname: string;

  @Column({
    unique: true,
    length: 250,
  })
  username: string;

  @Column({
    unique: true,
    length: 100,
  })
  email: string;

  @Column({ length: 250 })
  phone: string;

  @Column({ length: 100 })
  password: string;
}
