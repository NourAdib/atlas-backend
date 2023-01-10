import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1673337064308 implements MigrationInterface {
    name = '$npmConfigName1673337064308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
    }

}
