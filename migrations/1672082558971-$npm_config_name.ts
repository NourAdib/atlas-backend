import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672082558971 implements MigrationInterface {
    name = '$npmConfigName1672082558971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
