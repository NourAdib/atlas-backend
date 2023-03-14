import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678780013678 implements MigrationInterface {
    name = '$npmConfigName1678780013678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`goalId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD UNIQUE INDEX \`IDX_9b9ae2fda8caa069f3564df40e\` (\`goalId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9b9ae2fda8caa069f3564df40e\` ON \`event\` (\`goalId\`)`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_9b9ae2fda8caa069f3564df40e3\` FOREIGN KEY (\`goalId\`) REFERENCES \`event_goal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_9b9ae2fda8caa069f3564df40e3\``);
        await queryRunner.query(`DROP INDEX \`REL_9b9ae2fda8caa069f3564df40e\` ON \`event\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP INDEX \`IDX_9b9ae2fda8caa069f3564df40e\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`goalId\``);
    }

}
