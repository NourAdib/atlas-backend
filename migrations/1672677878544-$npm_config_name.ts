import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672677878544 implements MigrationInterface {
    name = '$npmConfigName1672677878544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`isTakenDown\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` varchar(255) NOT NULL DEFAULT 'undefined'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`isTakenDown\` tinyint NOT NULL`);
    }

}
