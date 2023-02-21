import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1676616826310 implements MigrationInterface {
    name = '$npmConfigName1676616826310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`memory\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`location\` varchar(255) NOT NULL, \`latitude\` int NOT NULL, \`longitude\` int NOT NULL, \`visibility\` varchar(255) NOT NULL, \`imageUrl\` longtext NOT NULL, \`imageId\` varchar(255) NOT NULL DEFAULT '', \`imageExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`memory\` ADD CONSTRAINT \`FK_fc71562e9a53841973da0dde326\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` DROP FOREIGN KEY \`FK_fc71562e9a53841973da0dde326\``);
        await queryRunner.query(`DROP TABLE \`memory\``);
    }

}
