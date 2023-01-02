import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672600378154 implements MigrationInterface {
    name = '$npmConfigName1672600378154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
    }

}
