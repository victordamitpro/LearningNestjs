import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTableIncreaseMaxLengthGoogleId1653769092673 implements MigrationInterface {
    name = 'UpdateUserTableIncreaseMaxLengthGoogleId1653769092673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`googleId\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`googleId\` varchar(500) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`googleId\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`googleId\` varchar(50) NULL`);
    }

}
