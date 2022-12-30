import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672417201262 implements MigrationInterface {
    name = '$npmConfigName1672417201262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_22b6df8103e450a49ea0f9ff939\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reportsAgainstId\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD \`reportedUserId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2d3711064572aa0203cba01242b\` FOREIGN KEY (\`reportedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2d3711064572aa0203cba01242b\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP COLUMN \`reportedUserId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reportsAgainstId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_22b6df8103e450a49ea0f9ff939\` FOREIGN KEY (\`reportsAgainstId\`) REFERENCES \`user_report\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
