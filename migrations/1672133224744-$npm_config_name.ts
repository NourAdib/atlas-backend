import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672133224744 implements MigrationInterface {
    name = '$npmConfigName1672133224744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`caption\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`visibility\` varchar(255) NOT NULL, \`postedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_fb7ffd0860cbcc5cf22c96d3c05\` FOREIGN KEY (\`postedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_fb7ffd0860cbcc5cf22c96d3c05\``);
        await queryRunner.query(`DROP TABLE \`post\``);
    }

}
