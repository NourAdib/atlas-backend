import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672678196724 implements MigrationInterface {
    name = '$npmConfigName1672678196724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`isTakenDown\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL DEFAULT 'undefined'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`isTakenDown\``);
    }

}
