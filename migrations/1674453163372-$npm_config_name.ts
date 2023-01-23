import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1674453163372 implements MigrationInterface {
    name = '$npmConfigName1674453163372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isBanned\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isBanned\``);
    }

}
