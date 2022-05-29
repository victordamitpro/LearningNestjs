import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTableCreateBy1653762280479
  implements MigrationInterface
{
  name = 'UpdateUserTableCreateBy1653762280479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`createdBy\` \`createdBy\` varchar(300) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`lastChangedBy\` \`lastChangedBy\` varchar(300) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`lastChangedBy\` \`lastChangedBy\` varchar(300) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`createdBy\` \`createdBy\` varchar(300) NOT NULL`,
    );
  }
}
