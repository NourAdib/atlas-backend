import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678975542609 implements MigrationInterface {
    name = '$npmConfigName1678975542609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_clue\` ADD \`date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_clue\` DROP COLUMN \`date\``);
    }

}
