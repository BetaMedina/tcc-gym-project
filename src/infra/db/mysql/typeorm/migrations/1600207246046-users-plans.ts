import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class usersPlans1600207246046 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users-plans',
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
    await queryRunner.createForeignKey('users-plans', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
    await queryRunner.createForeignKey('users-plans', new TableForeignKey({
      columnNames: ['plan_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'plans',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users-plans')
  }
}
