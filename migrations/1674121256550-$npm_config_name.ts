import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1674121256550 implements MigrationInterface {
    name = '$npmConfigName1674121256550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fcmToken\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fcmToken\``);
    }

}
