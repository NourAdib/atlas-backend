import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1673847605869 implements MigrationInterface {
    name = '$npmConfigName1673847605869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`block\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`blockingUserId\` varchar(36) NULL, \`blockedUserId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD CONSTRAINT \`FK_cac6c15bcaa655e31e86e48f59a\` FOREIGN KEY (\`blockingUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`block\` ADD CONSTRAINT \`FK_c9a8df2f7cbbae1cda940694409\` FOREIGN KEY (\`blockedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`block\` DROP FOREIGN KEY \`FK_c9a8df2f7cbbae1cda940694409\``);
        await queryRunner.query(`ALTER TABLE \`block\` DROP FOREIGN KEY \`FK_cac6c15bcaa655e31e86e48f59a\``);
        await queryRunner.query(`DROP TABLE \`block\``);
    }

}
