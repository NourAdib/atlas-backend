import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1676644288779 implements MigrationInterface {
    name = '$npmConfigName1676644288779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` ADD \`geoPoint\` point NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` DROP COLUMN \`geoPoint\``);
    }

}
