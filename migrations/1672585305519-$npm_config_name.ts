import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672585305519 implements MigrationInterface {
    name = '$npmConfigName1672585305519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`isTakenDown\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`isTakenDown\``);
    }

}
