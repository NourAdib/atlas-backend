import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1674198387677 implements MigrationInterface {
    name = '$npmConfigName1674198387677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`notificationPreference\` varchar(255) NOT NULL DEFAULT 'all'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`notificationPreference\``);
    }

}
