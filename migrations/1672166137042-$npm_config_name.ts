import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672166137042 implements MigrationInterface {
    name = '$npmConfigName1672166137042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`imageUrl\` \`imageUrl\` varchar(255) NOT NULL`);
    }

}
