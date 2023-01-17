import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1673974513613 implements MigrationInterface {
    name = '$npmConfigName1673974513613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`follow\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`followedById\` varchar(36) NULL, \`followedId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`follow_request\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`requestedById\` varchar(36) NULL, \`requestedUserId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_c2159058051b11b2f9bb1b36983\` FOREIGN KEY (\`followedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_f4a9d59861c87ba252ead40d84d\` FOREIGN KEY (\`followedId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow_request\` ADD CONSTRAINT \`FK_7c5f8647272441265e4c2e61071\` FOREIGN KEY (\`requestedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow_request\` ADD CONSTRAINT \`FK_37ecc4fc7d8451a768b704c43e0\` FOREIGN KEY (\`requestedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`follow_request\` DROP FOREIGN KEY \`FK_37ecc4fc7d8451a768b704c43e0\``);
        await queryRunner.query(`ALTER TABLE \`follow_request\` DROP FOREIGN KEY \`FK_7c5f8647272441265e4c2e61071\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_f4a9d59861c87ba252ead40d84d\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_c2159058051b11b2f9bb1b36983\``);
        await queryRunner.query(`DROP TABLE \`follow_request\``);
        await queryRunner.query(`DROP TABLE \`follow\``);
    }

}
