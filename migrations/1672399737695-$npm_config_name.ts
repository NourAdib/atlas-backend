import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672399737695 implements MigrationInterface {
    name = '$npmConfigName1672399737695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_aea779e51a733247bccf1f61d9a\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`reportsAgainstId\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD \`reportedPostId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`post_report\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'pending review'`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_a9aad25ed05e8f5a9dffbc17a4a\` FOREIGN KEY (\`reportedPostId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_a9aad25ed05e8f5a9dffbc17a4a\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP COLUMN \`reportedPostId\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`reportsAgainstId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_aea779e51a733247bccf1f61d9a\` FOREIGN KEY (\`reportsAgainstId\`) REFERENCES \`post_report\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
