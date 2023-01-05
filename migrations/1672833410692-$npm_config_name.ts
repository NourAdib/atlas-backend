import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672833410692 implements MigrationInterface {
    name = '$npmConfigName1672833410692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`isTakenDown\` \`isTakenDown\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`isTakenDown\` \`isTakenDown\` tinyint NOT NULL`);
    }

}
