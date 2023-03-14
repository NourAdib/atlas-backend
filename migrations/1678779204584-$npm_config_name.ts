import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678779204584 implements MigrationInterface {
    name = '$npmConfigName1678779204584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`creatorId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_7a773352fcf1271324f2e5a3e41\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_7a773352fcf1271324f2e5a3e41\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`creatorId\``);
    }

}
