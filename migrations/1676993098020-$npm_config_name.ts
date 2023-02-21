import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1676993098020 implements MigrationInterface {
    name = '$npmConfigName1676993098020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` DROP COLUMN \`geoPoint\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` ADD \`geoPoint\` geometry NULL`);
    }

}
