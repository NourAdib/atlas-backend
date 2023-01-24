import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1674544597118 implements MigrationInterface {
    name = '$npmConfigName1674544597118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hasStripAccount\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`stripeCustomerId\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`subscriptionPlan\` varchar(255) NOT NULL DEFAULT 'Basic'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`subscriptionPlan\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`stripeCustomerId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hasStripAccount\``);
    }

}
