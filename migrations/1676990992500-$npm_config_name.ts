import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1676990992500 implements MigrationInterface {
    name = '$npmConfigName1676990992500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` ADD \`geoPoint\` geometry NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` DROP COLUMN \`geoPoint\``);
    }

}
