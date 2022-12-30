import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672417384470 implements MigrationInterface {
    name = '$npmConfigName1672417384470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_report\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'pending review'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_report\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
    }

}
