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
            name: 'student_id',
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
      columnNames: ['student_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'students',
      onDelete: 'CASCADE',
      name: 'students-userPlans-fk'
    }))
    await queryRunner.createForeignKey('users_plans', new TableForeignKey({
      columnNames: ['plan_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'plans',
      onDelete: 'CASCADE',
      name: 'plans-userPlans-fk'

    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_plans', 'student_id')
    await queryRunner.dropForeignKey('users_plans', 'plan_id')
    await queryRunner.dropTable('users_plans')
  }
}
