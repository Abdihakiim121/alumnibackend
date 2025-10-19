import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsAlumniToUsers1760670000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'isAlumni',
        type: 'tinyint',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isAlumni');
  }
}
