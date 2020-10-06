import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class usersPlans1600207246046 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_plans',
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
            name: 'is_active',
            type: 'boolean',
            isNullable: false,
            default: true
          },
          {
            name: 'start_date',
            type: 'timestamp',
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
    await queryRunner.createForeignKey('users_plans', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
    await queryRunner.createForeignKey('users_plans', new TableForeignKey({
      columnNames: ['plan_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'plans',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_plans', 'user_id')
    await queryRunner.dropForeignKey('users_plans', 'plan_id')
    await queryRunner.dropTable('users_plans')
  }
}
