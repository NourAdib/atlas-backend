import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672576067204 implements MigrationInterface {
    name = '$npmConfigName1672576067204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_ban\` (\`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`bannedUserId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_ban\` ADD CONSTRAINT \`FK_43cb4b8de8f8cfa4fd2857369c2\` FOREIGN KEY (\`bannedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_ban\` DROP FOREIGN KEY \`FK_43cb4b8de8f8cfa4fd2857369c2\``);
        await queryRunner.query(`DROP TABLE \`user_ban\``);
    }

}
