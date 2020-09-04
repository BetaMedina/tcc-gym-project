import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity
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
  
  @Column('varchar')
  password: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @BeforeInsert()
  async hashPassword () {
    this.password = await bcrypt.hash(this.password, 11)
  }
}

export { Users }
