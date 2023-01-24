import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1674487677914 implements MigrationInterface {
    name = '$npmConfigName1674487677914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`likesCount\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`likesCount\``);
    }

}
