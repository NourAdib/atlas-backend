import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1673025398979 implements MigrationInterface {
    name = '$npmConfigName1673025398979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`createdAt\``);
    }

}
