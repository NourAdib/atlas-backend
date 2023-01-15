import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1673805114035 implements MigrationInterface {
    name = 'migrations1673805114035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`scrapbook\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`caption\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`visibility\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`text\` varchar(255) NOT NULL, \`authorId\` varchar(36) NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_report\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending review', \`reason\` varchar(255) NOT NULL, \`reportedPostId\` varchar(36) NULL, \`reportedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`like\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'unliked', \`userId\` varchar(36) NULL, \`postId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`caption\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`visibility\` varchar(255) NOT NULL, \`isTakenDown\` tinyint NOT NULL DEFAULT 0, \`imageUrl\` longtext NOT NULL, \`imageId\` varchar(255) NOT NULL DEFAULT '', \`imageExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`postedById\` varchar(36) NULL, \`scrapbookId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_report\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending review', \`reason\` varchar(255) NOT NULL, \`reportedUserId\` varchar(36) NULL, \`reportedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_ban\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`bannedUserId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`dateOfBirth\` datetime NOT NULL, \`role\` varchar(255) NOT NULL, \`profilePictureUrl\` longtext NOT NULL, \`profilePictureId\` varchar(255) NOT NULL DEFAULT '', \`profilePictureExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`gender\` varchar(255) NOT NULL DEFAULT 'undefined', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`scrapbook\` ADD CONSTRAINT \`FK_b5db9533f87c9bc26bbb8ed3d06\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_a9aad25ed05e8f5a9dffbc17a4a\` FOREIGN KEY (\`reportedPostId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_929dcdf74558612cc6166981480\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_e8fb739f08d47955a39850fac23\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_3acf7c55c319c4000e8056c1279\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_fb7ffd0860cbcc5cf22c96d3c05\` FOREIGN KEY (\`postedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_baa1c30b37f90c0df2e56257f16\` FOREIGN KEY (\`scrapbookId\`) REFERENCES \`scrapbook\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2d3711064572aa0203cba01242b\` FOREIGN KEY (\`reportedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_report\` ADD CONSTRAINT \`FK_2e595b9d3a37e4b72879dddb5ce\` FOREIGN KEY (\`reportedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_ban\` ADD CONSTRAINT \`FK_43cb4b8de8f8cfa4fd2857369c2\` FOREIGN KEY (\`bannedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_ban\` DROP FOREIGN KEY \`FK_43cb4b8de8f8cfa4fd2857369c2\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2e595b9d3a37e4b72879dddb5ce\``);
        await queryRunner.query(`ALTER TABLE \`user_report\` DROP FOREIGN KEY \`FK_2d3711064572aa0203cba01242b\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_baa1c30b37f90c0df2e56257f16\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_fb7ffd0860cbcc5cf22c96d3c05\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_3acf7c55c319c4000e8056c1279\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_e8fb739f08d47955a39850fac23\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_929dcdf74558612cc6166981480\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_a9aad25ed05e8f5a9dffbc17a4a\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
        await queryRunner.query(`ALTER TABLE \`scrapbook\` DROP FOREIGN KEY \`FK_b5db9533f87c9bc26bbb8ed3d06\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`user_ban\``);
        await queryRunner.query(`DROP TABLE \`user_report\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`like\``);
        await queryRunner.query(`DROP TABLE \`post_report\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`scrapbook\``);
    }

}
