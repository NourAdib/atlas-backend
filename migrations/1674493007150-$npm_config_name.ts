import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1674493007150 implements MigrationInterface {
    name = '$npmConfigName1674493007150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scrapbook\` DROP FOREIGN KEY \`FK_b5db9533f87c9bc26bbb8ed3d06\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_48750d6b207c4bd82d30c5dd722\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_929dcdf74558612cc6166981480\``);
        await queryRunner.query(`ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_f975f729d8f811976339e642f1b\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_fb7ffd0860cbcc5cf22c96d3c05\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2d3711064572aa0203cba01242b\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2e595b9d3a37e4b72879dddb5ce\``);
        await queryRunner.query(`ALTER TABLE \`user_ban\` DROP FOREIGN KEY \`FK_43cb4b8de8f8cfa4fd2857369c2\``);
        await queryRunner.query(`ALTER TABLE \`block\` DROP FOREIGN KEY \`FK_c9a8df2f7cbbae1cda940694409\``);
        await queryRunner.query(`ALTER TABLE \`block\` DROP FOREIGN KEY \`FK_cac6c15bcaa655e31e86e48f59a\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_c2159058051b11b2f9bb1b36983\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_f4a9d59861c87ba252ead40d84d\``);
        await queryRunner.query(`ALTER TABLE \`follow_request\` DROP FOREIGN KEY \`FK_37ecc4fc7d8451a768b704c43e0\``);
        await queryRunner.query(`ALTER TABLE \`follow_request\` DROP FOREIGN KEY \`FK_7c5f8647272441265e4c2e61071\``);
        await queryRunner.query(`ALTER TABLE \`scrapbook\` ADD CONSTRAINT \`FK_b5db9533f87c9bc26bbb8ed3d06\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_48750d6b207c4bd82d30c5dd722\` FOREIGN KEY (\`likedById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_929dcdf74558612cc6166981480\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_f975f729d8f811976339e642f1b\` FOREIGN KEY (\`appealedById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_fb7ffd0860cbcc5cf22c96d3c05\` FOREIGN KEY (\`postedById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2d3711064572aa0203cba01242b\` FOREIGN KEY (\`reportedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2e595b9d3a37e4b72879dddb5ce\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_ban\` ADD CONSTRAINT \`FK_43cb4b8de8f8cfa4fd2857369c2\` FOREIGN KEY (\`bannedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD CONSTRAINT \`FK_cac6c15bcaa655e31e86e48f59a\` FOREIGN KEY (\`blockingUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD CONSTRAINT \`FK_c9a8df2f7cbbae1cda940694409\` FOREIGN KEY (\`blockedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_c2159058051b11b2f9bb1b36983\` FOREIGN KEY (\`followedById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_f4a9d59861c87ba252ead40d84d\` FOREIGN KEY (\`followedId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow_request\` ADD CONSTRAINT \`FK_7c5f8647272441265e4c2e61071\` FOREIGN KEY (\`requestedById\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow_request\` ADD CONSTRAINT \`FK_37ecc4fc7d8451a768b704c43e0\` FOREIGN KEY (\`requestedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow_request\` DROP FOREIGN KEY \`FK_37ecc4fc7d8451a768b704c43e0\``);
        await queryRunner.query(`ALTER TABLE \`follow_request\` DROP FOREIGN KEY \`FK_7c5f8647272441265e4c2e61071\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_f4a9d59861c87ba252ead40d84d\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_c2159058051b11b2f9bb1b36983\``);
        await queryRunner.query(`ALTER TABLE \`block\` DROP FOREIGN KEY \`FK_c9a8df2f7cbbae1cda940694409\``);
        await queryRunner.query(`ALTER TABLE \`block\` DROP FOREIGN KEY \`FK_cac6c15bcaa655e31e86e48f59a\``);
        await queryRunner.query(`ALTER TABLE \`user_ban\` DROP FOREIGN KEY \`FK_43cb4b8de8f8cfa4fd2857369c2\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2e595b9d3a37e4b72879dddb5ce\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2d3711064572aa0203cba01242b\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_fb7ffd0860cbcc5cf22c96d3c05\``);
        await queryRunner.query(`ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_f975f729d8f811976339e642f1b\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_929dcdf74558612cc6166981480\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_48750d6b207c4bd82d30c5dd722\``);
        await queryRunner.query(`ALTER TABLE \`scrapbook\` DROP FOREIGN KEY \`FK_b5db9533f87c9bc26bbb8ed3d06\``);
        await queryRunner.query(`ALTER TABLE \`follow_request\` ADD CONSTRAINT \`FK_7c5f8647272441265e4c2e61071\` FOREIGN KEY (\`requestedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow_request\` ADD CONSTRAINT \`FK_37ecc4fc7d8451a768b704c43e0\` FOREIGN KEY (\`requestedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_f4a9d59861c87ba252ead40d84d\` FOREIGN KEY (\`followedId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_c2159058051b11b2f9bb1b36983\` FOREIGN KEY (\`followedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD CONSTRAINT \`FK_cac6c15bcaa655e31e86e48f59a\` FOREIGN KEY (\`blockingUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD CONSTRAINT \`FK_c9a8df2f7cbbae1cda940694409\` FOREIGN KEY (\`blockedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_ban\` ADD CONSTRAINT \`FK_43cb4b8de8f8cfa4fd2857369c2\` FOREIGN KEY (\`bannedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2e595b9d3a37e4b72879dddb5ce\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2d3711064572aa0203cba01242b\` FOREIGN KEY (\`reportedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_fb7ffd0860cbcc5cf22c96d3c05\` FOREIGN KEY (\`postedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_f975f729d8f811976339e642f1b\` FOREIGN KEY (\`appealedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_929dcdf74558612cc6166981480\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_48750d6b207c4bd82d30c5dd722\` FOREIGN KEY (\`likedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`scrapbook\` ADD CONSTRAINT \`FK_b5db9533f87c9bc26bbb8ed3d06\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
