const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Auto1760589365202 {
    name = 'Auto1760589365202'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`login_history\` (\`loginHistoryId\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`ip\` varchar(255) NOT NULL, \`browser\` varchar(255) NOT NULL, \`loginDate\` datetime NOT NULL, \`logoutDate\` datetime NULL, PRIMARY KEY (\`loginHistoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`roleId\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(50) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_992f24b9d80eb1312440ca577f\` (\`roleName\`), PRIMARY KEY (\`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`passwordHash\` varchar(255) NOT NULL, \`phone\` varchar(20) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isVerified\` tinyint NOT NULL DEFAULT 0, \`otpCode\` varchar(10) NULL, \`isOtpVerified\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`roleId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userprofiles\` (\`profileId\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`middleName\` varchar(255) NULL, \`gender\` enum ('Male', 'Female') NULL, \`graduationYear\` year NULL, \`profession\` varchar(150) NULL, \`company\` varchar(150) NULL, \`country\` varchar(100) NULL, \`city\` varchar(100) NULL, \`bio\` text NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`facultyId\` int NULL, \`departmentId\` int NULL, \`batchId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_31cae5adb87b454cc4a3c2f879\` (\`userId\`), PRIMARY KEY (\`profileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`batches\` (\`batchId\` int NOT NULL AUTO_INCREMENT, \`batchYear\` year NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`batchId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departmentbatches\` (\`departmentBatchId\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`departmentId\` int NOT NULL, \`batchId\` int NOT NULL, UNIQUE INDEX \`unique_department_batch\` (\`departmentId\`, \`batchId\`), PRIMARY KEY (\`departmentBatchId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departments\` (\`departmentId\` int NOT NULL AUTO_INCREMENT, \`departmentName\` varchar(150) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`facultyId\` int NOT NULL, PRIMARY KEY (\`departmentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`faculties\` (\`facultyId\` int NOT NULL AUTO_INCREMENT, \`facultyName\` varchar(150) NOT NULL, \`description\` text NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`facultyId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`login_history\` ADD CONSTRAINT \`FK_911ecf99e0f1a95668fea7cd6d8\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`roleId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` ADD CONSTRAINT \`FK_6d37d56203f71d5142391648882\` FOREIGN KEY (\`facultyId\`) REFERENCES \`faculties\`(\`facultyId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` ADD CONSTRAINT \`FK_686fb7ec7af551f86db6f6d3ef2\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`departmentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` ADD CONSTRAINT \`FK_bea3ea6c91b6afa5bcc24f67a8a\` FOREIGN KEY (\`batchId\`) REFERENCES \`batches\`(\`batchId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` ADD CONSTRAINT \`FK_31cae5adb87b454cc4a3c2f8799\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`departmentbatches\` ADD CONSTRAINT \`FK_b4b2f856bf467afd4cdc3b9bec3\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`departmentId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`departmentbatches\` ADD CONSTRAINT \`FK_39017fc3c421290b183d12ff8cd\` FOREIGN KEY (\`batchId\`) REFERENCES \`batches\`(\`batchId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`departments\` ADD CONSTRAINT \`FK_8eb1debd52cf31a5efa81f9b87a\` FOREIGN KEY (\`facultyId\`) REFERENCES \`faculties\`(\`facultyId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`departments\` DROP FOREIGN KEY \`FK_8eb1debd52cf31a5efa81f9b87a\``);
        await queryRunner.query(`ALTER TABLE \`departmentbatches\` DROP FOREIGN KEY \`FK_39017fc3c421290b183d12ff8cd\``);
        await queryRunner.query(`ALTER TABLE \`departmentbatches\` DROP FOREIGN KEY \`FK_b4b2f856bf467afd4cdc3b9bec3\``);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` DROP FOREIGN KEY \`FK_31cae5adb87b454cc4a3c2f8799\``);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` DROP FOREIGN KEY \`FK_bea3ea6c91b6afa5bcc24f67a8a\``);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` DROP FOREIGN KEY \`FK_686fb7ec7af551f86db6f6d3ef2\``);
        await queryRunner.query(`ALTER TABLE \`userprofiles\` DROP FOREIGN KEY \`FK_6d37d56203f71d5142391648882\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`login_history\` DROP FOREIGN KEY \`FK_911ecf99e0f1a95668fea7cd6d8\``);
        await queryRunner.query(`DROP TABLE \`faculties\``);
        await queryRunner.query(`DROP TABLE \`departments\``);
        await queryRunner.query(`DROP INDEX \`unique_department_batch\` ON \`departmentbatches\``);
        await queryRunner.query(`DROP TABLE \`departmentbatches\``);
        await queryRunner.query(`DROP TABLE \`batches\``);
        await queryRunner.query(`DROP INDEX \`REL_31cae5adb87b454cc4a3c2f879\` ON \`userprofiles\``);
        await queryRunner.query(`DROP TABLE \`userprofiles\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_992f24b9d80eb1312440ca577f\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`login_history\``);
    }
}
