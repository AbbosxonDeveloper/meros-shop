import { MigrationInterface, QueryRunner } from "typeorm";

export class table1675685731494 implements MigrationInterface {
    name = 'table1675685731494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" TO "PK_96aac72f1574b88752e9fb00089"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_96aac72f1574b88752e9fb00089" TO "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "user_id" TO "id"`);
    }

}
