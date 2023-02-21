import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1676624523857 implements MigrationInterface {
    name = '$npmConfigName1676624523857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`memory\` ADD \`latitude\` decimal(8,6) NOT NULL DEFAULT '0.000000'`);
        await queryRunner.query(`ALTER TABLE \`memory\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`memory\` ADD \`longitude\` decimal(8,6) NOT NULL DEFAULT '0.000000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`memory\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`memory\` ADD \`longitude\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`memory\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`memory\` ADD \`latitude\` int NOT NULL`);
    }

}
