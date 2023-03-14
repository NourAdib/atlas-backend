import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1678774445242 implements MigrationInterface {
    name = '$npmConfigName1678774445242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`event_clue\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`text\` varchar(255) NOT NULL, \`latitude\` decimal(8,6) NOT NULL DEFAULT '0.000000', \`longitude\` decimal(8,6) NOT NULL DEFAULT '0.000000', \`imageUrl\` longtext NOT NULL, \`imageId\` varchar(255) NOT NULL DEFAULT '', \`imageExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`eventId\` varchar(36) NULL, \`creatorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_goal\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`text\` varchar(255) NOT NULL, \`latitude\` decimal(8,6) NOT NULL DEFAULT '0.000000', \`longitude\` decimal(8,6) NOT NULL DEFAULT '0.000000', \`imageUrl\` longtext NOT NULL, \`imageId\` varchar(255) NOT NULL DEFAULT '', \`imageExpiryDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`creatorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`numberOfParticipants\` int NOT NULL, \`latitude\` decimal(8,6) NOT NULL DEFAULT '0.000000', \`longitude\` decimal(8,6) NOT NULL DEFAULT '0.000000', \`visibility\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_participants_user\` (\`eventId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_cb16f471dfa696d2da841aaf21\` (\`eventId\`), INDEX \`IDX_120333cf695db458809e8b29e2\` (\`userId\`), PRIMARY KEY (\`eventId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`event_clue\` ADD CONSTRAINT \`FK_d7835fe85af927de67a58305cfa\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_clue\` ADD CONSTRAINT \`FK_c2e03da07cfe6311f67a2c14699\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_goal\` ADD CONSTRAINT \`FK_f422f6f552c1c7b7a63e784cab5\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` ADD CONSTRAINT \`FK_cb16f471dfa696d2da841aaf21e\` FOREIGN KEY (\`eventId\`) REFERENCES \`event\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` ADD CONSTRAINT \`FK_120333cf695db458809e8b29e22\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` DROP FOREIGN KEY \`FK_120333cf695db458809e8b29e22\``);
        await queryRunner.query(`ALTER TABLE \`event_participants_user\` DROP FOREIGN KEY \`FK_cb16f471dfa696d2da841aaf21e\``);
        await queryRunner.query(`ALTER TABLE \`event_goal\` DROP FOREIGN KEY \`FK_f422f6f552c1c7b7a63e784cab5\``);
        await queryRunner.query(`ALTER TABLE \`event_clue\` DROP FOREIGN KEY \`FK_c2e03da07cfe6311f67a2c14699\``);
        await queryRunner.query(`ALTER TABLE \`event_clue\` DROP FOREIGN KEY \`FK_d7835fe85af927de67a58305cfa\``);
        await queryRunner.query(`DROP INDEX \`IDX_120333cf695db458809e8b29e2\` ON \`event_participants_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb16f471dfa696d2da841aaf21\` ON \`event_participants_user\``);
        await queryRunner.query(`DROP TABLE \`event_participants_user\``);
        await queryRunner.query(`DROP TABLE \`event\``);
        await queryRunner.query(`DROP TABLE \`event_goal\``);
        await queryRunner.query(`DROP TABLE \`event_clue\``);
    }

}
