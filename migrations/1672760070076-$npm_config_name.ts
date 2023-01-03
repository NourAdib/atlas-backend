import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1672760070076 implements MigrationInterface {
    name = '$npmConfigName1672760070076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profilePictureExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profilePictureUrl\` \`profilePictureUrl\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profilePictureUrl\` \`profilePictureUrl\` varchar(255) NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/atlas-6183a.appspot.com/o/Avatars%2FAvatars%2FdefaultImage.png?alt=media&token=4482a7ff-450d-4bf8-a4d7-8b4a1a6ebbd2'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profilePictureExpiryDate\``);
    }

}
