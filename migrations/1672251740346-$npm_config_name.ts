import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672251740346 implements MigrationInterface {
    name = '$npmConfigName1672251740346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`scrapbook\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`caption\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`visibility\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`scrapbookId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`scrapbook\` ADD CONSTRAINT \`FK_b5db9533f87c9bc26bbb8ed3d06\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_baa1c30b37f90c0df2e56257f16\` FOREIGN KEY (\`scrapbookId\`) REFERENCES \`scrapbook\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_baa1c30b37f90c0df2e56257f16\``);
        await queryRunner.query(`ALTER TABLE \`scrapbook\` DROP FOREIGN KEY \`FK_b5db9533f87c9bc26bbb8ed3d06\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`scrapbookId\``);
        await queryRunner.query(`DROP TABLE \`scrapbook\``);
    }

}
