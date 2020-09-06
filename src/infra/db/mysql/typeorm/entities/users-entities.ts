import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
  AfterLoad
} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity('users')
class Users extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;
  
  @Column('varchar', { select: false })
  password: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Users }
