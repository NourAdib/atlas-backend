import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1673027114310 implements MigrationInterface {
    name = '$npmConfigName1673027114310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_a9aad25ed05e8f5a9dffbc17a4a\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_a9aad25ed05e8f5a9dffbc17a4a\` FOREIGN KEY (\`reportedPostId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_report\` DROP FOREIGN KEY \`FK_a9aad25ed05e8f5a9dffbc17a4a\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
        await queryRunner.query(`ALTER TABLE \`post_report\` ADD CONSTRAINT \`FK_a9aad25ed05e8f5a9dffbc17a4a\` FOREIGN KEY (\`reportedPostId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
