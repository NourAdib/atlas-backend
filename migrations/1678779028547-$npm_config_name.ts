import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678779028547 implements MigrationInterface {
    name = '$npmConfigName1678779028547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_clue\` DROP COLUMN \`imageExpiryDate\``);
        await queryRunner.query(`ALTER TABLE \`event_clue\` DROP COLUMN \`imageId\``);
        await queryRunner.query(`ALTER TABLE \`event_clue\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`event_goal\` DROP COLUMN \`imageExpiryDate\``);
        await queryRunner.query(`ALTER TABLE \`event_goal\` DROP COLUMN \`imageId\``);
        await queryRunner.query(`ALTER TABLE \`event_goal\` DROP COLUMN \`imageUrl\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_goal\` ADD \`imageUrl\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_goal\` ADD \`imageId\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`event_goal\` ADD \`imageExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`event_clue\` ADD \`imageUrl\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_clue\` ADD \`imageId\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`event_clue\` ADD \`imageExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
