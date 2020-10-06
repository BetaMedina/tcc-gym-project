import { MigrationInterface, QueryRunner, Table, Unique } from 'typeorm'

export class users1599178886981 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'age',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            isNullable: false,
            default: false
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
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
