import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678780110507 implements MigrationInterface {
    name = '$npmConfigName1678780110507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9b9ae2fda8caa069f3564df40e\` ON \`event\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_9b9ae2fda8caa069f3564df40e\` ON \`event\` (\`goalId\`)`);
    }

}
