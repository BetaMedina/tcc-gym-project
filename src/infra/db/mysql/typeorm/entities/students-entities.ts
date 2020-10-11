import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'

@Entity('students')
class Students extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('integer')
  age: number;
 
  @Column({ type: 'float', precision: 10, scale: 2 })
  height:Number

  @Column({ type: 'float', precision: 10, scale: 2 })
  weigth:Number
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Students }
