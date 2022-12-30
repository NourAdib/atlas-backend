import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672388811259 implements MigrationInterface {
    name = '$npmConfigName1672388811259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_report\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL, \`reason\` varchar(255) NOT NULL, \`reportedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_report\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL, \`reason\` varchar(255) NOT NULL, \`reportedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`reportsAgainstId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reportsAgainstId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_929dcdf74558612cc6166981480\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_aea779e51a733247bccf1f61d9a\` FOREIGN KEY (\`reportsAgainstId\`) REFERENCES \`post_report\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2e595b9d3a37e4b72879dddb5ce\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_22b6df8103e450a49ea0f9ff939\` FOREIGN KEY (\`reportsAgainstId\`) REFERENCES \`user_report\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_22b6df8103e450a49ea0f9ff939\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2e595b9d3a37e4b72879dddb5ce\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_aea779e51a733247bccf1f61d9a\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_929dcdf74558612cc6166981480\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reportsAgainstId\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`reportsAgainstId\``);
        await queryRunner.query(`DROP TABLE \`user_report\``);
        await queryRunner.query(`DROP TABLE \`post_report\``);
    }

}
