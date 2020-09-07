import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'

@Entity('users')
class Users extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;
  
  @Column('varchar')
  password: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Users }
