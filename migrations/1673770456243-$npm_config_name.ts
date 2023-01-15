import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1673770456243 implements MigrationInterface {
    name = '$npmConfigName1673770456243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`appeal\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending review', \`reportReason\` varchar(255) NOT NULL, \`text\` varchar(255) NOT NULL, \`appealedPostId\` varchar(36) NULL, \`appealedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_7b9ec6db412ee31e791072faf29\` FOREIGN KEY (\`appealedPostId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appeal\` ADD CONSTRAINT \`FK_f975f729d8f811976339e642f1b\` FOREIGN KEY (\`appealedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_f975f729d8f811976339e642f1b\``);
        await queryRunner.query(`ALTER TABLE \`appeal\` DROP FOREIGN KEY \`FK_7b9ec6db412ee31e791072faf29\``);
        await queryRunner.query(`DROP TABLE \`appeal\``);
    }

}
