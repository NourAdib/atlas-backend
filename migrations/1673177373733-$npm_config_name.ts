import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1673177373733 implements MigrationInterface {
    name = '$npmConfigName1673177373733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_ban\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_ban\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_ban\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_ban\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP COLUMN \`createdAt\``);
    }

}
