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
            name: 'student_id',
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
    await queryRunner.createForeignKey('users_payments', new TableForeignKey({
      columnNames: ['student_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'students',
      name: 'student-usersPayments-fk',
      onDelete: 'CASCADE'

    }))
    await queryRunner.createForeignKey('users_payments', new TableForeignKey({
      columnNames: ['plan_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'plans',
      name: 'payments-usersPayments-fk',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_payments', 'student_id')
    await queryRunner.dropForeignKey('users_payments', 'plan_id')
    await queryRunner.dropTable('users_payments')
  } 
}
