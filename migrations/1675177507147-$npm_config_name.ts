import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1675177507147 implements MigrationInterface {
    name = '$npmConfigName1675177507147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`followersCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`followingCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`bio\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`bio\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`followingCount\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`followersCount\``);
    }

}
