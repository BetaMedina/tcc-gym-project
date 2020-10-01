import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class userspayments1601504307331 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_payments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'plan_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'payment_value',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'payment_type',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'payment_date',
            type: 'timestamp',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()'
          }
        ]
      }))
    await queryRunner.createForeignKey('users_plans', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      name: 'userpayment_user'

    }))
    await queryRunner.createForeignKey('users_plans', new TableForeignKey({
      columnNames: ['plan_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'plans',
      onDelete: 'CASCADE',
      name: 'userpayment_plan'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_payments', 'user_id')
    await queryRunner.dropForeignKey('users_payments', 'plan_id')
    await queryRunner.dropTable('users_payments')
  } 
}
