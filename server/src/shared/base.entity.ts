import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  createdBy: string;

  @UpdateDateColumn()
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastChangedBy: string;
}
