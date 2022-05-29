import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1653756449532 implements MigrationInterface {
  name = 'CreateUserTable1653756449532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(300) NOT NULL, \`lastChangedDateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastChangedBy\` varchar(300) NOT NULL, \`firstName\` varchar(250) NULL, \`lastName\` varchar(250) NULL, \`userName\` varchar(250) NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(250) NULL, \`password\` varchar(100) NULL, \`googleId\` varchar(50) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
