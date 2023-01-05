import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672832148243 implements MigrationInterface {
    name = '$npmConfigName1672832148243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`imageId\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`imageExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`imageUrl\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`imageUrl\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`imageExpiryDate\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`imageId\``);
    }

}
